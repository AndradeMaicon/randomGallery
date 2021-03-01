// extrai do localStorage
let favorites = JSON.parse(localStorage.getItem('favorites'))

let imageGrid = document.querySelector('.grid')
let clearGallery = document.querySelector('#clear-gallery')

function dropGallery() {
  localStorage.removeItem('favorites')

  clearTags()
}

// cria a estruta html que exibe imagen
function imgCard(element) {
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('imgs');

  let exclud = document.createElement('div');
  exclud.classList.add('delete');


  let imgTag = document.createElement('img');
  imgTag.setAttribute('src', element)
  exclud.append(imgTag);

  let span = document.createElement('span');
  span.innerHTML = 'x';
  exclud.append(span);
  span.setAttribute('data-id', element)
  span.onclick = deleteImg


  imageContainer.append(exclud);


  return imageContainer
}

// exibir as imagens
function updateGallery() {
  clearTags()

  favorites.forEach(element => { 
    imageGrid.append(imgCard(element));
  });
}


// captura o evento de click no botao excluir
function observeEvents() {
  clearGallery.addEventListener('click', dropGallery)
}

//deletar uma imagem
function deleteImg(event) {
  const buttonX = event.target
  const imageSource = buttonX.dataset.id;

  const index = favorites.indexOf(imageSource)

  favorites.splice(index, 1)

  localStorage.setItem('favorites', JSON.stringify(favorites))

  location.reload();
  updateGallery()
}

function clearTags() {
  imageGrid.querySelectorAll('.imgs').forEach(element => element.remove())
}

async function init() {
  await updateGallery()
  observeEvents()
}

window.addEventListener('load', init())
