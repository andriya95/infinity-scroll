// Image Container
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//  Unsplash APIconst 
const count = 30;
const apiKey = 'R_wNlGE0LHGSIki9LwWebavuYVUI_sXC9vPI0jJ6SdU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden =true;
    imagesLoaded=0;
    console.log('ready =', ready);
  }
}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links in photos
function displayPhotos() {
  totalImages = photosArray.length;
  console.log('total images =', totalImages);
  // Run function for each
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event LIstener, check when each image is loaded
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then both in imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}

// Get Photos from Unsplash APIconst
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error) {
    // Catch Error Here
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();