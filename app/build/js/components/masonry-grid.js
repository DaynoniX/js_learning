class MasonryGrid extends HTMLElement{
    constructor() {
        super();
    }
    generateGrid(){

    }
    renderArticlesFromPixabay(el){
        let item = document.createElement('article');
        let image = new Image();
        let imageWrapper = document.createElement('div');

        image.src = el.largeImageURL;

        imageWrapper.classList.add('grid-item_img');
        imageWrapper.appendChild(image);

        item.classList.add('grid-item', 'loading');
        item.appendChild(imageWrapper);
        item.innerHTML += `
            <div class="grid-item_title">
                Image title
            </div>`;
        this.appendChild(item);
        image.onload = () => item.classList.remove('loading');
    }
}
customElements.define("masonry-grid", MasonryGrid);