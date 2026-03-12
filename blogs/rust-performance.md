# How to tune Rust for maximum performance

Rust is already a very fast language by default, yet there are still ways to optimize your binary for maximum performance. After reading this guide, you'll be able to make your Rust code run as fast as lightning.

**NOTE:** This guide only tunes configuration options does not contains tips for writing fast Rust code.

## Cargo Configuration

Every Rust project has a `Cargo.toml` file to configure the project's dependencies and build settings. While the default `Cargo.toml` file works well, I mostly use a separate config file at `.cargo/config.toml` which works just like the `Cargo.toml`, but with the benefit of separating some config options into a dedicated file.

**NOTE:** Some sections like `build` are only available inside the `.cargo/config.toml` file.

It's also good to mention, that most performance optimization options will be exclusively used inside the `profile.release` section of the config file, which enabled these options only when building for release. Otherwise, development builds would become very slow and inefficient.

## Basic Optimization

This is performance tuned by default in release builds, but I would still like to mention the `opt-level` option, which controls the level of optimization applied to the code.

There are 5 levels of optimization available:
- `0`: No optimization
- `1`: Basic optimization
- `2`: Moderate optimization
- `3`: Aggressive optimization
- `s`: Optimize for size.
- `z`: Optimize for size, but also disable loop vectorization (decreases performance, but further optimizes code size).

We'll use `opt-level = 3` for our release builds.

## Link-Time Optimization

Link-Time Optimization (LTO) is a feature of the LLVM linker that allows optimization during linking of code. It's set via the `lto` option.

There are multiple valid options corresponding to 3 modes:
- `false`, `n`, `no` or `off`: Disable LTO
- `thin`: Enable thin LTO
- `true`, `y`, `yes`, `on` or `fat`: Enable fat LTO

While thin LTO is faster to compile, fat LTO may produce even better performance at the cost of longer compile times.

**NOTE:** Sometimes thin LTO can be faster than fat LTO. I suggest, you try both and see which works best for you.

## Codegen Units

Code generation can be quite slow. That's why Rust supports specifying codegen units via the `codegen-units` option. Multiple codegen units can improve compile times by parallelizing compilation, but may also increase memory usage.

Because of this parallelization overhead, performance may degrade, because Rust doesn't have much time to optimize each unit before moving on to the next.

By setting `codegen-units = 1`, we avoid parallelization overhead and allow Rust to optimize each unit more thoroughly.

## Stripping & Panicking

Even in release builds, Rust may include debug information and panicking always unwinds by default. This means, that after a panic, the entire stack is unwound, which produces great debugging output, but can slow down panic handling and increase code size by a lot.

By setting `panic = "abort"` and `strip = true`, we can strip debug information and disable unwinding, which can improve panic handling performance and reduce code size.

**NOTE:** With these config values, debugging becomes way harder and I recommend keeping an eye on your error handling and logging, so that you can still diagnose issues effectively.

## Codegen Arguments

While we already tuned the codegen units, there are still some arguments we can pass to `rustc` to fine-tune code generation.

You can set rustflags via the `rustflags` option in your `.cargo/config.toml` file inside the `build` section.

Codegen flags are passed to the compiler via the `-C` flag.

There are two flags that are especially useful for performance tuning:

- `target-cpu` - Sets the target CPU to generate code for. This can improve performance, but may lead to compatibility issues. You can set it to a modern CPU like `skylake` or `native` to target the host CPU.
- `tune-cpu` - Tunes the code generation for the target CPU. This can improve performance without possible compatibility issues.

Example:

```toml
[build]
rustflags = [
    "-Ctarget-cpu=native",
]
```

## LLVM Passes

As we all know, Rust is built on LLVM, so optimizing LLVM code generation would be the next logical step here.

LLVM provides [passes](https://llvm.org/docs/Passes.html) which can be run during compilation to do certain things like removing dead code, optimizing loops or transforming code.

This is kind of black magic, but it can be very powerful when used correctly.

I built following Rust-compatible pass list:

```toml
rustflags = ["-Cpasses=sroa,licm,gvn,loop-simplify,aggressive-instcombine,loop-deletion,memcpyopt,tailcallelim,adce"]
```

The first passes simplify and transform the code for better optimization opportunities, while the latter passes optimize the code itself.

## Bonus: Profile Rustflags

Always using release-optimized rustflags can be frustrating for development builds, so I sometimes use the unstable `profile-rustflags` feature which allows the `rustflags` option to be set inside rust profiles.

Example:

```toml
# at the top of your Cargo.toml
cargo-features = ["profile-rustflags"]

# .cargo/config.toml
[profile.dev]
rustflags = [
    "-Ctarget-cpu=native",
]
```

## Summary

This guide goes through configuration of rust for maximum performance.

I may also make a guide to optimize for compile time and maybe an in-depth guide to optimizing rust code itself.

**Fun Fact:** A clean hello-world release build, without any options set, takes `0.57s`, while adding all the above mentioned optimizations bring compilation time up to `10.72s`. That's `1880 %` slower.
