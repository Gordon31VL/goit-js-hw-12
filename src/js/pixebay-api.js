import axios from 'axios';
import { getPhotos, gallery, loadMoreButton } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const searchImageForm = document.querySelector('.searchPhoto');
const loader = document.createElement('span');
loader.classList.add('loader');

export async function getData(event) {
  try {
    let userSearching = searchImageForm.inputText.value.trim();
    let newUserSearching = '';
    let page = 1;
    let totalImages = 15;

    if (newUserSearching != userSearching) {
      newUserSearching = userSearching;
      page = 1;
      gallery.innerHTML = '';
      loadMoreButton.style.display = 'none';
    }

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

    document.body.append(loader);

    const response = await axios.get(
      `https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${newUserSearching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
    );

    document.body.removeChild(loader);

    if (response.data.hits.length === 0) {
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
    getPhotos(response.data.hits);

    loadMoreButton.addEventListener('click', async () => {
      try {
        page += 1;
        totalImages += 15;
        document.body.append(loader);
        const response = await axios.get(
          `https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${newUserSearching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
        );
        document.body.removeChild(loader);
        console.log(response);
        getPhotos(response.data.hits);

        if (response.data.totalHits <= totalImages) {
          loadMoreButton.style.display = 'none';
          iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
