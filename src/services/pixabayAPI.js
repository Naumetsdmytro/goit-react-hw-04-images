import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImagesByTheme = async (theme, page) => {
  const response = await axios.get(
    `/?q=${theme}&page=${page}&key=33257823-2ec7b17938c0bf72817c659ff&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
