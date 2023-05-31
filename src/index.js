import Notiflix, { Notify } from "notiflix";
import API from './api.js';

// API.getNews("gpt-3").then((result) => console.log(result));

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let value = '';
let page = 1;
let totalPage = 1;

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick);

async function onSubmit(event) {
    event.preventDefault();
    
  try {
    page = 1;
  value = event.currentTarget.elements.searchQuery.value.trim();
  if (value === '') {
    return alert('No value!');
  }
  const data = await API.getNews(value);
   Notify.success(`Hooray! We found ${data.totalHits} images.`)
    totalPage = Math.ceil(data.totalHits / 40);
    checkPages();
   
  const murkup = createMarkup(data.hits);
  refs.gallery.innerHTML = murkup;
  } catch (error) {
    Notify.failure(error.message);
  }
}


async function onloadMoreBtnClick() {
  try {
    page += 1;
    const data = await API.getNews(value, page);
    checkPages(); 
  const murkup = createMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', murkup);
  } catch (error) {
      Notify.failure(error.message);
  }
}

function checkPages() {
    if (page === totalPage) {
        refs.loadMoreBtn.classList.add("is-hidden")
    } else {
        refs.loadMoreBtn.classList.remove("is-hidden")
    }
}

function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" data-original="${largeImageURL}"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}

function updateNewsList(markup) {}

function onError(err) {
  console.log(err);
}
