async function get_all_articles() {
    const res = await fetch("/all.txt");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const articles = await res.text();
    return articles.split('\n').filter(Boolean);
}

async function render_articles() {
    let articles_wrapper = document.querySelector("#articles");

    const articles = await get_all_articles();
    articles.forEach(article => {
        const title = article.split('@')[0];
        const link = article.split('@')[1];

        let article_element = document.createElement("a");
        article_element.innerText = title;
        article_element.href = link;

        articles_wrapper.append(article_element);
    })
}

async function update_search() {
    await render_articles();

    const params = new URLSearchParams(window.location.search);
    const search_query = params.get("search");
    const all_articles_elements = document.querySelectorAll("#articles a");
    const found_articles = document.querySelector("#found-articles");
    let not_found = document.querySelector("#not-found");
    let blank_search = document.querySelector("#blank-search");

    if (search_query == '')
    {
        blank_search.classList.add("visible");
        return;
    }

    let found_one = false;
    console.log(all_articles_elements)
    for (let article of all_articles_elements)
    {
        console.log(article.innerText.toLowerCase().includes(search_query.toLowerCase()))
        if (article.innerText.toLowerCase().includes(search_query.toLowerCase()))
        {
            found_articles.append(article.cloneNode(true));
            found_one = true;
        }
    }
    if (!found_one)
        not_found.classList.add("visible");
}

update_search();
