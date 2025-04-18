import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchQuery = '';
let page = 1;
let lightbox;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = e.target.searchQuery.value.trim();
  if (!searchQuery) return;

  try {
    const images = await fetchImages(searchQuery, page);
    if (images.length === 0) {
      iziToast.warning({ title: 'No images found!', position: 'topRight' });
      return;
    }
    renderGallery(images);
    lightbox = new SimpleLightbox('.gallery a').refresh();
    loadMoreBtn.style.display = 'block';
  } catch (err) {
    console.error(err);
    iziToast.error({ title: 'Error!', message: 'Something went wrong', position: 'topRight' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  const images = await fetchImages(searchQuery, page);
  renderGallery(images);
  lightbox.refresh();
});

async function fetchImages(query, page) {
  const API_KEY = '49802266-c21e5bd68270577f38908d7ce';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data.hits;
}

function renderGallery(images) {
  const markup = images
    .map(
      img => `
    <a class="gallery-item" href="${img.largeImageURL}">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
    </a>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
