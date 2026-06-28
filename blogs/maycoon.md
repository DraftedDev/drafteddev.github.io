# Sunsetting Maycoon: What I learned

I was always interested in UI design and desktop application development.
During my journey, I tried to work with Electron, Qt, Avalonia, Tauri, Flutter and some other random UI frameworks, but I've always kind of longed for a rusty solution.

I tried Rust UI libraries like [egui](https://github.com/emilk/egui), [tauri](https://github.com/tauri-apps/tauri), [gtk-rs](https://github.com/gtk-rs/gtk) and [iced](https://github.com/iced-rs/iced), but they all didn't satisfy me:
- egui is good for prototyping, but it's immediate mode UI and less performant than other solutions.
- tauri is like electron, but faster and smaller, yet you need JavaScript or some other web frontend. Plus you need to communicate with Rust somehow.
- gtk-rs is most suitable for linux, but it's not really for macOS and Windows.
- iced is probably the most rusty and production-ready framework, but it uses the Elm architecture, which leads to an immense amount of boilerplate code with actions and stuff.

# Starting Maycoon

A few years ago, I decided: I need to make my own framework. I named it **maycoon**, after the cat race "maine-coon", and made a fancy logo.

Right at the start, I remade the framework multiple times to fit my needs.

I wanted to use `winit` as a base for window management and investigated into rendering backends.

## Choosing a 2D renderer

The first thing I needed was a 2D renderer. There are several options available, but I wanted to use the "most performant" and modern one.

Skia came into my mind, when I thought about modern frameworks like Flutter, but `skia-safe` (the Rust wrapper around Skia) was too complex and un-rusty.

I tried `tiny-skia` as an experiment and it worked really well, but it uses CPU rendering and lacks fundamental features like Text rendering.

After searching for a viable alternative to `skia-safe`, I found `femtovg`, which used OpenGL at the time for rendering. I deemed it good enough and started working, but my "MAXIMUM PERFORMANCE MODERN QUICK FAST SUPER HIGH SPEED!!!!!!!" brain scraped that idea in favor of: `vello`.

`vello` is a modern, high-performance 2D renderer that uses WebGPU for rendering. It uses compute shaders and supports things like text rendering and clipping. It's being developed by the linebender team, which also developed `druid`, a UI toolkit that sadly got deprecated.

After testing, I chose `vello` over `femtovg` and started working again.

## State Management

Another difficult choice, because it's kind of final and decides the overall architecture of the framework. I wanted a flexible solution, that didn't involve massive boilerplate code like `iced`.

**I thought about following:**

What if I have a container that holds any value and communicates with my framework by having an inner update value. The framework goes through the widget tree and gets the highest priority update from the tree. This way, the user or widget can decide which parts of the UI to update.

I made a `bitflags` enum with values:
- `LAYOUT`: Recalculates the layout of the widget tree **AND** redraws it.
- `DRAW`: Redraws the widget tree.
- `FORCE`: Forces a redraw and a layout recalculation.

This was my base idea for the entire framework all along.

After experimenting with boxed functions and strange traits, I made a basic trait that looked like this:

```rust
pub trait Signal<T: 'static>: 'static {
    fn get(&self) -> Ref<'_, T>;
    
    fn listen(self, listener: Box<dyn Fn(Ref<'_, T>)>) -> Self
       where Self: Sized;

    fn notify(&self);

    fn set(&self, value: T) { ... }
}
```

While `get` retrieves a reference to the value, `set` sets the inner value and notifies the listeners via `notify`.

`listen` is used to register listeners to the value, which get called, when the value changes.

This is similar to how frameworks like `flutter-hooks` manage state. I also made utility structures like `MaybeSignal` (which may hold a signal or a fixed value), `BoxedSignal` (which holds a boxed type-erased signal) and added basic signals like `StateSignal` (which holds a mutable inner value), `EvalSignal` (which evaluates the inner value on each `get` call with a closure) and `MapSignal` (which maps an inner signal, so it returns another type, similar to `Option::map`).

## Futures in UI

The next thing I thought about is integrating Rust's powerful async ecosystem into Maycoon.

I made a little `TaskRunner` enum that contains crate-feature-dependent fields containing an async runtime. I started with a `TaskRunner::Tokio` to integrate `tokio` into the framework first.

After adding a global `TASK_RUNNER` and basic functions like `spawn`, `spawn_blocking` and `block_on`, I thought about integrating all this into the actual UI.

Apps often need to run some kind of background task, wether it's downloading a resource or just having a background thread perform work. `iced` solved this by making their pipeline kind of async with an integrated async runtime and a `Command` that can run async tasks.

I wanted to do it like Flutter though. Flutter has an interesting widget called `FutureBuilder` which contains a future and a builder function. Whenever the widget should draw the UI, it polls the future and runs the builder function with the polling result as an argument. The function can decide what to do depending on the result of the future (which might still be running, completed or completed with an error).

Following this philosophy of reactive UI + futures, I made a `WidgetFetcher` structure. This is similar to `FutureBuilder` in flutter and expects a future, possibly even a blocking task, that runs in the background with a builder function building the resulting widget based on the task result.

## Where it failed

The UI and rendering engine behind the framework wasn't the issue. The issue was state management and Rust itself.

I love Rust and its safety and performance, it's however less than ideal for managing complex application state. 

You essentially only have a few ways to implement state:
- Immediate mode: The UI isn't reactive, it always re-renders and re-evaluates. This is what egui uses.
  - Very expressive and easy to learn and use.
  - Usable for local and global state.
  - **Huge** performance drawbacks.
- Elm/Redux Architecture: The app uses actions or commands to communicate with state and trigger changes. This is what `iced` uses.
  - Reactive and pretty easy learn.
  - Good for local state (requires extra boilerplate for global).
  - Expressive and Rust-friendly.
  - Way too much boilerplate for simple app logic.
  - Can get very messy with many state changes and complex logic.
- Signals: Reactive values that notify the engine if they change.
  - Also pretty expressive and easy to learn.
  - Good for local state (not used much in global state).
  - Not as Rust-friendly as immediate or redux architecture.

Other state management solutions exist, but build upon one of these and aren't really Rust friendly either.

Still, all these management techniques require use of `'static`, `Box`es, `Pin`s or other types that make the entire development process more complex and restricted.

In Rust, what one would call "Interface" or "Abstract Class" in other programming languages, traits are used to unify behaviour of common types. Usage of multiple different types however, which is common in UI logic, requires you to abstract over traits using things like `Box`es which often come with the `'static` requirement of inner values and heavy usage can slow down the program.

Combined with `Send` and `Sync` for most values, `Pin` for futures and the annoying borrow checker, you'll eventually end up with `Box`, `Mutex`, `RwLock` or other resource-heavier types (at least if you follow the state management approach, I used).

Still, I believe Rust is expressive and powerful enough for some UI frameworks to thrive. `iced` for example has found a pretty neat concept and I think in future work, I will be using it. I even though about building an extension for the Elm architecture, to make it more usable without much boilerplate.

I need to admit though, I'm simply not fit for maintaining such a huge project and it would require my full attention, which I'm not willing or able to give. I'm recently getting into AI and other stuff, so maybe I'll be trying to create a project in another field.

## TL;DR

Rust is extremely powerful and expressive, but I simply don't have the time or the patience to create a huge UI framework, that crates like `iced` became. If you want to create stable production-ready apps with ease, visit [flutter](https://flutter.dev) perhaps or any of the other thousands of UI frameworks. I do hope though, that I will be proven wrong in the future and UI + Rust may rise from the ashes to provide a real alternative to big UI languages like C# and Dart.
