import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const loadMoreButton = document.createElement('button');
loadMoreButton.classList.add('loadButton');
loadMoreButton.textContent = 'Load More';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function getPhotos(photos) {
  let imageBox = '';
  const oldImageCount = gallery.children.length;

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
  lightbox.refresh();
  loadMoreButton.style.display = 'block';
  document.body.append(loadMoreButton);

  const newList = document.querySelectorAll('.image');
  const newFirstImage = newList[oldImageCount];

  if (newList.length > 15) {
    const rect = newFirstImage.getBoundingClientRect();
    window.scrollBy({
      top: rect.top - 20,
      behavior: 'smooth',
    });
  }
}
