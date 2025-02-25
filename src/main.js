import { getData } from './js/pixebay-api';
import { getPhotos } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const loadMoreButton = document.createElement('button');
const loader = document.querySelector('.loader');
loader.style.display = 'none';
loadMoreButton.classList.add('loadButton');
loadMoreButton.textContent = 'Load More';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const searchImageForm = document.querySelector('.searchPhoto');
let page = 1;
let newUserSearching = '';

searchImageForm.addEventListener('submit', async event => {
  event.preventDefault();
  loader.style.display = 'block';
  page = 1;

  try {
    gallery.innerHTML = '';
    loadMoreButton.style.display = 'none';

    newUserSearching = searchImageForm.inputText.value.trim();
    searchImageForm.inputText.value = newUserSearching;  //Заповнення імпута трімнутим значенням, саме те, що відправляється на бекенд

    if (!newUserSearching || newUserSearching === '') {
      iziToast.error({
        color: '#EF4040',
        message: 'Error, input field is empty',
        messageColor: '#FAFAFB',
        maxWidth: '432',
        iconColor: '#FAFAFB',
      });
      return;
    }

    const responseData = await getData(newUserSearching, page);

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
    loadMoreButton.style.display = 'block';
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
    document.body.append(loadMoreButton);
    lightbox.refresh();
  }
});

loadMoreButton.addEventListener('click', async event => {
  loader.style.display = 'block';
  loadMoreButton.style.display = 'none';

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

    loadMoreButton.style.display = 'block';
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
    lightbox.refresh();
  }
});
