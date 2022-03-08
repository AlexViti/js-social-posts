/*
POSTS ARRAY
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

likesIdArr = [];

// HTML ELEMENTS
const postContainer = document.getElementById('container');

// Convert date into european format
const dateFormatConverter = (date) => date.split('-').reverse().join('/');

function fistLetters(nameStr) {
    const nameArr = nameStr.split(' ');
    let firstLetters = '';
    for (let i = 0; i < nameArr.length && i < 3; i++) {
        firstLetters += nameArr[i].charAt(0);
    }
    return firstLetters;
}

// Create a post for each object in the array
posts.forEach(post => postCreator(post));

// Function that create and append the post html element
function postCreator(postObj) {
    const postTemplate = document.createElement('div');
    postTemplate.classList.add('post');

    const postMeta__icon = document.createElement('div');
    postMeta__icon.classList.add('post-meta__icon');
    if (postObj.author.image != null) {
        postMeta__icon.innerHTML = `
            <img class="profile-pic" 
                src="${postObj.author.image}"
                alt="${postObj.author.name}"
            > 
        `;
    }
    else {
        postMeta__icon.classList.add('profile-pic-default')
        const firstLetters = fistLetters(postObj.author.name);
        postMeta__icon.innerHTML = `<span>${firstLetters}</span>`
        ;
    }

    postTemplate.innerHTML = `
        <div class="post__header">
            <div class="post-meta">
                ${postMeta__icon.outerHTML}
                <div class="post-meta__data">
                    <div class="post-meta__author">${postObj.author.name}</div>
                    <div class="post-meta__time">${dateFormatConverter(postObj.created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${postObj.content}</div>
        <div class="post__image">
            <img src="${postObj.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${postObj.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${postObj.id}" class="js-likes-counter">${postObj.likes}</b> persone
                </div>
            </div> 
        </div>         
    `;
    postContainer.append(postTemplate);
    const likeBtn = document.querySelector(`[data-postid="${postObj.id}"]`);
    likeBtn.addEventListener('click', like);
}

function like(event) {
    event.preventDefault();
    const likeCounter = document.getElementById(`like-counter-${this.dataset.postid}`);
    const post = searchPost(this.dataset.postid);
    
    if (!this.classList.contains('like-button--liked')) {
        likeCounter.innerHTML = ++post.likes;
        likesIdArr.push(post.id);
    } else {
        likeCounter.innerHTML = --post.likes;
        likesIdArr.splice(likesIdArr.indexOf(post.id), 1);
    }

    this.classList.toggle('like-button--liked');

}

function searchPost(dataId) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == parseInt(dataId)) return posts[i];
    }
}