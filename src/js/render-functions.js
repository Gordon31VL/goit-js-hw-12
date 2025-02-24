import { gallery } from "../main";

export function getPhotos(photos) {
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

  gallery.insertAdjacentHTML('beforeend', imageBox);
}
