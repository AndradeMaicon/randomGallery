let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image');
const button = document.querySelector('button');

//events
button.onclick = () => updateImage();

imageContainer.onclick = () => updateAll()

//methods
function getState() {
  const imageSource = document.querySelector('.image img').src

  const index = favorites.indexOf(imageSource)
  const existsInLocalStorage = index !== -1;

  return { imageSource, index, existsInLocalStorage }
}

async function updateAll() {
  await updateFavorites()
  updateClasses()
}

function updateFavorites() {
  const { imageSource, index, existsInLocalStorage } = getState();

  existsInLocalStorage ? favorites.splice(index, 1) : favorites.push(imageSource)

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses() {
  const { existsInLocalStorage } = getState();

  console.log(existsInLocalStorage)

  imageContainer.classList.remove('fav')

  if(existsInLocalStorage) {
    imageContainer.classList.add('fav')
  }
}

async function updateImage() {
  await getExternalImage();
  updateClasses();
}

async function getExternalImage() {
  const {url} = await fetch('https://source.unsplash.com/random');

  imageContainer.innerHTML = `<img src="${url}"/>`
}

getExternalImage();
