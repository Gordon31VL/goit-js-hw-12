import { getData } from './js/pixebay-api';
import { loadMoreButton, getPhotos } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.createElement('span');
loader.classList.add('loader');

export const searchImageForm = document.querySelector('.searchPhoto');
export let responseData = {};
let page = 1;
let newUserSearching = '';
let totalImages = 15;

searchImageForm.addEventListener('submit', async event => {
  event.preventDefault();
  document.body.append(loader);

  try {
    let userSearching = searchImageForm.inputText.value.trim();

    if (newUserSearching != userSearching) {
      newUserSearching = userSearching;
      page = 1;
      totalImages = 15;
      gallery.innerHTML = '';
      loadMoreButton.style.display = 'none';
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
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
    lightbox.refresh();
  }
});

loadMoreButton.addEventListener('click', async event => {
  document.body.append(loader);
  loadMoreButton.style.display = 'none';

  try {
    totalImages += 15;
    page++;
    const responseData = await getData(newUserSearching, page);

    if (responseData.totalHits <= totalImages) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
      });

      return;
    }

    getPhotos(responseData.hits);
    loadMoreButton.style.display = 'block';
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
    lightbox.refresh();
  }
});
