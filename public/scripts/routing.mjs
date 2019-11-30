/**
 * Takes the HTMLElement
 * Looks for data-url attribute for route.
 * And on change of routing it will render corresponding page.
 * Using display: block and display: none underhood.
 * Returns navigate function.
 * @param {*} root 
 */
export default function routing(root){
    const pages = {};
    const pagesArr = Array.from(root.childNodes);
    for(let page of pagesArr){
        if(!page.dataset) continue;
        if(!page.dataset.url) pages[''] = page;
        else pages[page.dataset.url] = page;
    }
    const update = () => {
        const currentPage = pages[window.location.hash.replace('#', '')] || pages[''];
        for(let page of pagesArr){
            if(!page.style) continue;
            page.style.display = 'none';
        }
        currentPage.style.display = 'block';
    }
    window.onpopstate = update;
    update();
    return function navigate(url){
        window.history.pushState({}, url, window.location.pathname + '#' + url);
        update();
    }
}