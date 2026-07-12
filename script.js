// populate articles
const h2_titles = document.querySelectorAll("h2");
let contents_wrapper = document.querySelector("#contents>div");
const MAX_CONTENTS_LEN = 20;
h2_titles.forEach(h2 => {
    const url = window.location.href.split('#')[0]; // .split('#')[0] to remove any left-over #<something> from the URL
    let title = h2.innerText;

    // shorten title to fit a max length
    if (title.length > MAX_CONTENTS_LEN)
    {
        // title = title.slice(0, MAX_CONTENTS_LEN) + '...';
        title = title.slice(0, MAX_CONTENTS_LEN);
    }

    // change title id
    let title_contents = h2.innerText;
    title_contents = title_contents.replace(/\s/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    h2.id = title_contents;

    // make link to title
    let link = document.createElement("a");
    link.href = url + '#' + title_contents;
    link.innerText = title;
    link.classList.add("block");

    contents_wrapper.appendChild(link);
});


// cookies
if (!document.cookie.includes("hide-disclaimer="))
{
    document.cookie = "hide-disclaimer=false; path=/; SameSite=Lax";
}

function hide_disclaimer()
{
    document.cookie = "hide-disclaimer=true; path=/; SameSite=Lax";
    disclaimer.classList.remove("display-none");
    disclaimer.style.display = "none";
}

// show disclaimers if user hasn't chosen to hide them
let disclaimer = document.querySelector("#disclaimer");

if (document.cookie.includes("hide-disclaimer=false"))
{
    disclaimer.classList.remove("display-none");
}
else {
    disclaimer.classList.add("display-none");
}

// for sources list
const sources_heading = Array.from(document.querySelectorAll('h2'))
  .find(h2 => h2.textContent.trim() === 'Sources');

const source_paragraphs = [];

if (sources_heading) {
  let sibling = sources_heading.nextElementSibling;

  // Walk forward until the next H2 (or end of siblings)
  while (sibling && sibling.tagName !== 'H2') {
    if (sibling.tagName === 'P') {
      source_paragraphs.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }
}

source_paragraphs.forEach(p => {
    if ([...p.children].every(el => el.tagName === "A"))
    {
        p.classList.add("link-list");
    }
});
