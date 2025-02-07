import { getData, searchImageForm } from './js/pixebay-api'


searchImageForm.addEventListener("submit", event => {
    event.preventDefault();
    getData(event);
});

