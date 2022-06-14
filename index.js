const SERVER_API_URL = 'http://localhost:8000';

const eventHandlers = () => {
    window.addEventListener('DOMContentLoaded', init);
}

const init = () => {
    loadArticles()
}

const loadArticles = () => {
    fetch(`${SERVER_API_URL}/articles`)
        .then(res => res.json())
        .then(data => {
            renderArticles(data.articles);
        })
}

const renderArticles = (items) => {
    const $root = document.querySelector('#root');

    const $items = items.map(item => {
        const $container = document.createElement('article');

        const $title = document.createElement('h2'); // <h2></h2>
              $title.innerText = item.title; // <h2>Title</h2>
        
        const $desription = document.createElement('p');
              $desription.innerText = item.description;

        $container.appendChild($title);
        $container.appendChild($desription);

        return $container;
    });

    $root.replaceChildren(...$items);
}


eventHandlers();
