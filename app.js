let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const loadingSpinner = document.querySelector('.loader');

let photosArr = [];

// boolean variable to initialize
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'qEYq-pTK2eez958T5Z4Nm2yNGoeWA--o1ynMT_uI8nE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loadingSpinner.hidden = true;
    }
}

// helper function to set attribute values dynamically
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArr.length;
    photosArr.forEach((photo) => {
        const imageContainer = document.querySelector('.image-container');
        // create <a> element to link Unsplash image link
        let item = document.createElement('a');
        setAttributes(item, {
            href: photo.links,
            target: '_blank',
        })
        item.classList.add('image-url')
        // create <image> element for photo
        let imageEl = document.createElement('img');
        setAttributes(imageEl, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        })
        imageEl.classList.add('images');
        imageEl.addEventListener('load', imageLoaded);
        // append <img> to <a>, then append <a> to imageContainer element
        item.append(imageEl);
        imageContainer.append(item);
    });
}

async function getPhotosFromApi() {
    try {
        // Get data from Unsplash API
        const res = await fetch(apiUrl);
        photosArr = await res.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (err) {
        console.log(err);
    }
}

// event listener
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotosFromApi();
    }
})

// on load
getPhotosFromApi();