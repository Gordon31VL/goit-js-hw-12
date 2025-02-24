import { getData } from './js/pixebay-api';
import { getPhotos } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const loadMoreButton = document.createElement('button');
const loader = document.createElement('span');
loadMoreButton.classList.add('loadButton');
loadMoreButton.textContent = 'Load More';
loader.classList.add('loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const searchImageForm = document.querySelector('.searchPhoto');
let page = 1;
let newUserSearching = '';

searchImageForm.addEventListener('submit', async event => {
  event.preventDefault();
  document.body.append(loader);

  try {
    gallery.innerHTML = '';

    if (document.body.contains(loadMoreButton)) {
      document.body.removeChild(loadMoreButton);
    }

    searchImageForm.inputText.value = searchImageForm.inputText.value.trim();
    let userSearching = searchImageForm.inputText.value;

    if (newUserSearching != userSearching) {
      newUserSearching = userSearching;
      page = 1;
    }

    const responseData = await getData(newUserSearching, page);

    if (!userSearching) {
      iziToast.error({
        color: '#EF4040',
        message: 'Error, input field is empty',
        messageColor: '#FAFAFB',
        maxWidth: '432',
        iconColor: '#FAFAFB',
      });
      return;
    }

    if (responseData.hits.length === 0) {
      iziToast.error({
        color: '#EF4040',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        messageColor: '#FAFAFB',
        maxWidth: '432',
        iconColor: '#FAFAFB',
      });

      return;
    }

    getPhotos(responseData.hits);
    document.body.append(loadMoreButton);
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
    lightbox.refresh();
  }
});

loadMoreButton.addEventListener('click', async event => {
  document.body.append(loader);
  document.body.removeChild(loadMoreButton);

  try {
    page++;
    const responseData = await getData(newUserSearching, page);
    const oldImageCount = gallery.children.length;

    getPhotos(responseData.hits);

    if (responseData.totalHits <= gallery.children.length) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
      });

      return;
    }
    const newList = document.querySelectorAll('.image');
    const newFirstImage = newList[oldImageCount];
    const rect = newFirstImage.getBoundingClientRect();
    window.scrollBy({
      top: rect.top - 20,
      behavior: 'smooth',
    }); 

    document.body.append(loadMoreButton);
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
    lightbox.refresh();
  }
});
