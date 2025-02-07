import { getData, searchImageForm } from './pixebay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function getPhotos(photos) {
  gallery.innerHTML = '';
  let imageBox = '';

  photos.forEach(image => {
    imageBox += `
      <li class="image">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" width="360" height="200">
          <div class="imageStats">
          <p><span>Likes</span>${image.likes}</p>
          <p><span>Views</span> ${image.views}</p>
          <p><span>Comments</span> ${image.comments}</p>
          <p><span>Downloads</span> ${image.downloads}</p>
          </div>
          </a>
      </li>
    `;
  });

  gallery.innerHTML = imageBox;
  lightbox.refresh();
}
