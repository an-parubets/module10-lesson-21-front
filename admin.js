const SERVER_API_URL = 'http://localhost:8000';

const $form = document.querySelector('.form');
const $root = document.querySelector('#root');

const eventHandlers = () => {
    window.addEventListener('DOMContentLoaded', init);
    $form.addEventListener('submit', submitHandler);
    $root.addEventListener('click', selectArticle);
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
        const $container = document.createElement('div');
              $container.classList.add('article');

        const $title = document.createElement('h2'); // <h2></h2>
              $title.innerText = item.title; // <h2>Title</h2>

        const $updateButton = document.createElement('button');
              $updateButton.innerText = 'Update';
              $updateButton.setAttribute('data-action', 'update');
              $updateButton.setAttribute('data-id', item.id);

        const $deleteButton = document.createElement('button');
              $deleteButton.innerText = 'Delete';
              $deleteButton.setAttribute('data-action', 'delete');
              $deleteButton.setAttribute('data-id', item.id);

        $container.appendChild($title);
        $container.appendChild($updateButton);
        $container.appendChild($deleteButton);

        return $container;
    });

    $root.replaceChildren(...$items);
}

const submitHandler = (event) => {
    event.preventDefault();

    // const title = document.querySelector('input[name="title"]').value;
    // const author = document.querySelector('input[name="author"]').value;
    // const description = document.querySelector('textarea[name="description"]').value;

    const title = event.target.elements.title.value;
    const author = event.target.elements.author.value;
    const description = event.target.elements.description.value;

    const data = {
        title,
        author,
        description,
    };

    if (event.target.getAttribute('action') === 'POST') {
        createArticle(data);
    } else {
        updateArticle(data, event.target.getAttribute('data-article-id'));
    }
}

const createArticle = (data) => {
    fetch(`${SERVER_API_URL}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            loadArticles();
        })
        .catch(error => console.log(error))
}

const updateArticle = (data, id) => {
    fetch(`${SERVER_API_URL}/articles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            loadArticles();
        })
        .catch(error => console.log(error))
}

const selectArticle = (event) => {
    if (event.target.nodeName === 'BUTTON') {
        if (event.target.getAttribute('data-action') === 'update') {
            const id = event.target.getAttribute('data-id');
    
            fetch(`${SERVER_API_URL}/articles/${id}`)
                .then(res => res.json())
                .then(data => {
                    insertData(data.article)
                })
                .catch(error => console.log(error));
    
    
    
        } else if (event.target.getAttribute('data-action') === 'delete') {
            const id = event.target.getAttribute('data-id');
    
            fetch(`${SERVER_API_URL}/articles/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    loadArticles();
                })
                .catch(error => console.log(error));
        }
    }
}

const insertData = (article) => {
    document.querySelector('input[name="title"]').value = article.title;
    document.querySelector('input[name="author"]').value = article.author;
    document.querySelector('textarea[name="description"]').value = article.description;

    $form.setAttribute('data-article-id', article.id);
    $form.setAttribute('action', 'PATCH');
}

eventHandlers();

// const fetchFriends = () => {
// 	return fetch("my-api.com/me")
//         .then(res => res.json())
//         .then(token => {
// 	        return fetch(`my-api.com/profile?token=${token}`);
// 	    })
//         .then(res => res.json())
//         .then(user => {
// 	        return fetch(`my-api.com/users/${user.id}/friends`);
// 	    });
// };

// const fetchFriends = async () => {
// 	const token = await fetch("my-api.com/me").then(res => res.json());
//     const user = await fetch(`my-api.com/profile?token=${token}`).then(res => res.json());
//     const friends = await fetch(`my-api.com/users/${user.id}/friends`).then(res => res.json())
// };