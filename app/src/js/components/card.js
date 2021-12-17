class ImageCard extends HTMLElement {
    constructor(){
        super();
        this.addEventListener('click', (e)=>{
            this.toggleOpen();
        });
    }
    get open(){
        return this.hasAttribute('open')
    }
    set open(val){
        if(val){
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open')
        }
    }
    toggleOpen(){
       this.open ? this.open = false : this.open = true;
    }
    static get observedAttributes() {
        return ['open'];
    }
    attributeChangedCallback(name, oldValue, newValue){
        if (this.open){
            this.expandImage();
            console.log(1)
        } else {
            this.collapseImage();
        }
    }
    expandImage(){
        const modalWrapper = document.createElement('div');
        const imgWrapper = document.createElement('div');
        const img = new Image();

        img.src = this.querySelector('img').getAttribute('src');
        imgWrapper.classList.add('image-wrapper');
        modalWrapper.classList.add('popup');
        imgWrapper.appendChild(img);
        modalWrapper.appendChild(imgWrapper);
        this.appendChild(modalWrapper);
    }
    collapseImage(){
        this.querySelector('.popup').remove();
    }


}
customElements.define("image-card", ImageCard);
