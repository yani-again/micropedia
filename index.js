// for sources list
document.querySelectorAll("p").forEach(p => {
    if ([...p.children].every(el => el.tagName === "A"))
    {
        p.classList.add("link-list");
    }
});

// for recent.txt recent articles
async function load_recent() {
  const res = await fetch('/recent.txt');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text = await res.text();
  return text.split('\n').filter(Boolean);
}

async function render_articles() {
    let articles = await load_recent();
    let articles_wrapper = document.querySelector("#recent-articles");

    articles.forEach(article => {
        const title = article.split('@')[0];
        const link = article.split('@')[1];

        let article_element = document.createElement("a");
        article_element.innerText = title;
        article_element.href = link;

        articles_wrapper.append(article_element);
    })
}

render_articles();
