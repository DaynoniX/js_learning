document.addEventListener("DOMContentLoaded", function(event) {
    const btn = document.querySelector('#startBtn');
    const area = document.querySelector('#gridArea');
    let url = 'https://pixabay.com/api/?key=20542154-ac47cf93cfdf6c130a0d33f59&per_page=18';



    btn.addEventListener('click', ()=>{
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.hits.forEach(el => {
                    let item = document.createElement('article');
                    let image = new Image();
                    let imageWrapper = document.createElement('div');

                    image.src = el.largeImageURL;

                    imageWrapper.classList.add('grid-item_img');
                    item.classList.add('grid-item', 'loading');

                    imageWrapper.appendChild(image);
                    item.appendChild(imageWrapper);
                    item.innerHTML += `
                            <div class="grid-item_title">
                                Image title
                            </div>`;
                    area.appendChild(item);
                    image.onload = () => item.classList.remove('loading');

                })
            })
    })
});