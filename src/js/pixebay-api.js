import axios from 'axios';


export async function getData(userSearching, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${userSearching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
}
