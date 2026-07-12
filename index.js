// for sources list
document.querySelectorAll("p").forEach(p => {
    if ([...p.children].every(el => el.tagName === "A"))
    {
        p.classList.add("link-list");
    }
});
