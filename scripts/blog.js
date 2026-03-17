const blogs = document.querySelector(".blogs");
const title = document.querySelector(".title");

async function loadBlogPosts() {
  try {
    const response = await fetch("./blogs/index.json");
    const posts = (await response.json()).blogs;

    posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
        <div class="blog-item">
          <h1>${post.title}</h1>
          <p>${post.date}</p>
          <a href="./blog.html?read=${post.file}">Read More</a>
        <div />
      `;
      blogs.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading the blog index:", error);
  }
}

async function readPost(file) {
  const response = await fetch(`./blogs/${file}`);
  const text = await response.text();

  const { markedHighlight } = globalThis.markedHighlight;

  marked.use({
    renderer: {
      code(code, lang) {
        if (lang === "mermaid") {
          return `<pre class="mermaid">${code}</pre>`;
        }
        // Return null to let the default highlighter handle other languages
        return null;
      },
    },
  });

  marked.use(
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  const html = marked.parse(text);
  blogs.innerHTML = `<div class="content blog has-text-left">${html}</div>`;

  mermaid.initialize({ startOnLoad: false, theme: "dark" }); // Or 'default'
  await mermaid.run({
    nodes: document.querySelectorAll(".language-mermaid"),
  });
}

const params = new URLSearchParams(window.location.search);
const readFile = params.get("read");

if (readFile) {
  readPost(readFile);
} else {
  loadBlogPosts();
}
