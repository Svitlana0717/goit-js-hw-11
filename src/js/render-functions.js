// js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const createGallery = (images) => {
  const galleryContainer = document.querySelector('.gallery');
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
        <li>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
        </li>`
    )
    .join('');
  galleryContainer.innerHTML = markup;
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

export const clearGallery = () => {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
};

export const showLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('visible');
};

export const hideLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
};
