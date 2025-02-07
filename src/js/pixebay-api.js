import axios from 'axios';
import { getPhotos, gallery } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const searchImageForm = document.querySelector('.searchPhoto');

export function getData(event) {
  const userSearching = searchImageForm.inputText.value.trim();
    if (!userSearching) {
        iziToast.error({
          color: '#EF4040',
          message: 'Error, input field is empty',
          messageColor: '#FAFAFB',
          maxWidth: '432',
          iconColor: '#FAFAFB',
        });
        return
    }
  gallery.innerHTML = '<span class="loader"></span>';

  setTimeout(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${userSearching}&image_type=photo&orientation=horizontal&safesearch=true`
      )
      .then(response => {
        if (response.data.hits == 0) {
          iziToast.error({
            color: '#EF4040',
            message:
              'Sorry, there are no images matching your search query. Please, try again!',
            messageColor: '#FAFAFB',
            maxWidth: '432',
            iconColor: '#FAFAFB',
          });

          gallery.innerHTML = '';
          return;
        }
        getPhotos(response.data.hits);
      })
      .catch(error => {
        console.log(error);
      });
  }, 2000);
}
