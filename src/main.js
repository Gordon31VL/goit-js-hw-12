import { getData, searchImageForm } from './js/pixebay-api';
import { loadMoreButton } from './js/render-functions';
const loader = document.createElement('span');
loader.classList.add('loader');

searchImageForm.addEventListener('submit', async event => {
  event.preventDefault();
  document.body.append(loader);

  try {
    await getData();
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
  }
});

loadMoreButton.addEventListener('click', async event => {
  event.preventDefault();
  document.body.append(loader);
  loadMoreButton.style.display = 'none';

  try {
    await getData();
  } catch (error) {
    console.error(error);
  } finally {
    document.body.removeChild(loader);
    loadMoreButton.style.display = 'block';
  }
});
