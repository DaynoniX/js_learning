document.addEventListener("DOMContentLoaded", function(event) {
    const btn = document.querySelector('#startBtn');
    const area = document.querySelector('#gridArea');
    let url = 'https://pixabay.com/api/?key=20542154-ac47cf93cfdf6c130a0d33f59&per_page=18';



    btn.addEventListener('click', ()=>{
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Должна возвращать значение и вызывать функцию обработки,
                // которая, в свою очередь, будет более эффективно вызывать методы компонента

                // Переделать
                data.hits.forEach(el => gridArea.renderArticlesFromPixabay(el));
                console.log(data)
            })
    })
});

