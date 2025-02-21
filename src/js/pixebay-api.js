import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotos, gallery } from './render-functions';
import { loadMoreButton } from './render-functions';

export const searchImageForm = document.querySelector('.searchPhoto');

let page = 1;
let totalImages = 15;
let newUserSearching = '';

export async function getData() {
  
  try {
    let userSearching = searchImageForm.inputText.value.trim();
  
    if (newUserSearching != userSearching) {
      newUserSearching = userSearching;
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
    
    const response = await axios.get(
      `https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${newUserSearching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
    );
    
    if (response.data.totalHits <= totalImages) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
    
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
    
    page += 1;
    totalImages += 15;
    getPhotos(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}
