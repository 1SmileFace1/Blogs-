// Функция для сохранения постов в LocalStorage
function savePosts(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Функция для загрузки постов из LocalStorage
function loadPosts() {
    return JSON.parse(localStorage.getItem('blogPosts')) || [];
}

// Рендеринг постов
function renderPosts() {
    const posts = loadPosts();
    const postsContainer = document.getElementById('blog-posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'card mb-3';
        postElement.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${post.title}</h3>
                <p class="card-text">${post.content}</p>
                <p class="text-muted"><small>Теги: ${post.tags || 'Нет'}</small></p>
                <button class="btn btn-warning btn-sm me-2" onclick="editPost(${index})">Редактировать</button>
                <button class="btn btn-danger btn-sm" onclick="deletePost(${index})">Удалить</button>
            </div>
        `;
        postsContainer.appendChild(postElement);

        // Анимация появления
        setTimeout(() => {
            postElement.classList.add('show');
        }, 100);
    });
}

// Добавление нового поста
document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const tags = document.getElementById('post-tags').value;

    const posts = loadPosts();
    posts.push({ title, content, tags });
    savePosts(posts);

    renderPosts();
    this.reset();
});

// Удаление поста
function deletePost(index) {
    const posts = loadPosts();
    posts.splice(index, 1);
    savePosts(posts);
    renderPosts();
}

// Редактирование поста
function editPost(index) {
    const posts = loadPosts();
    const post = posts[index];

    // Заполняем форму данными поста
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-tags').value = post.tags;

    // Сохраняем индекс редактируемого поста
    editingIndex = index;

    // Скроллим к форме (опционально)
    document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const tags = document.getElementById('post-tags').value;

    const posts = loadPosts();

    if (editingIndex !== null) {
        // Обновляем существующий пост
        posts[editingIndex] = { title, content, tags };
        editingIndex = null; // Сбрасываем индекс
    } else {
        // Добавляем новый пост
        posts.push({ title, content, tags });
    }

    savePosts(posts);
    renderPosts();
    this.reset(); // Очищаем форму
});

// Поиск по постам
document.getElementById('search-input').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const posts = loadPosts();
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)
    );

    const postsContainer = document.getElementById('blog-posts');
    postsContainer.innerHTML = '';

    filteredPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'card mb-3';
        postElement.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${post.title}</h3>
                <p class="card-text">${post.content}</p>
                <p class="text-muted"><small>Теги: ${post.tags || 'Нет'}</small></p>
                <button class="btn btn-warning btn-sm me-2" onclick="editPost(${index})">Редактировать</button>
                <button class="btn btn-danger btn-sm" onclick="deletePost(${index})">Удалить</button>
            </div>
        `;
        postsContainer.appendChild(postElement);

        // Анимация появления
        setTimeout(() => {
            postElement.classList.add('show');
        }, 100);
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', renderPosts);
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    if (posts.length === 0) {
        const examplePosts = [
            { title: "Пример поста 1", content: "Это пример содержимого первого поста.", tags: "пример, тест" },
            { title: "Пример поста 2", content: "Это пример содержимого второго поста.", tags: "пример, блог" }
        ];
        savePosts(examplePosts);
        return examplePosts;
    }
    return posts;
}
let editingIndex = null; // Индекс поста, который редактируется