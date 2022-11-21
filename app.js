function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

const natureSection = getElement('.nature');
const citySection = getElement('.city');
const modal = getElement('.modal');
const mainImage = getElement('.main-img');
const imageName= getElement('.image-name');
const modalContent = getElement('.modal');
const modalImages = getElement('.modal-images');
let imageArray;

window.addEventListener('click', showModal);


function showModal(e){
  let target = e.target;
  if(target.classList.contains('nature-img')){
    openSection(target, 'nature');
  } 

  if(target.classList.contains('city-img')){
    openSection(target, 'city');
  } 
  
}

function openSection(target, sectionName){
  
    modal.classList.add('open');
    setMainImage(target);

    imageArray = Array.from(document.querySelectorAll(`.${sectionName}-img`));

    const displayThumb = imageArray.map((img) => {
      return `
      <img
        src="${img.src}"
        title="${img.title}"
        id="${img.dataset.id}"
        class="${target.dataset.id === img.dataset.id? 'modal-img selected': 'modal-img'}"
        alt="${img.title}"
      />
      `
    }).join('')

    modalImages.innerHTML = displayThumb; 
}

modalContent.addEventListener('click', (e) => {
  let targetItem = e.target;
  
  if(targetItem.classList.contains('modal-img')){

    imageArray = [...modalImages.querySelectorAll('.modal-img')];
    imageArray.map((e) => {
      if(e.classList.contains('selected')){
        e.classList.remove('selected')
      }
    })
    
    setMainImage(targetItem);
    targetItem.classList.add('selected');
  }

  if(targetItem.classList.contains('next')){
    const activeThumb = modalImages.querySelector('.selected');
    const next = activeThumb.nextElementSibling || modalImages.firstElementChild;
    activeThumb.classList.remove('selected');
    next.classList.add('selected');
    setMainImage(next);
  }

  if(targetItem.classList.contains('prev')){
    const activeThumb = modalImages.querySelector('.selected');
    const prev = activeThumb.previousElementSibling || modalImages.lastElementChild;
    activeThumb.classList.remove('selected');
    prev.classList.add('selected');
    setMainImage(prev);
  }

  if(targetItem.classList.contains('close')){
    modal.classList.remove('open');
    imageArray;
    // remove event listener from modalContent if it breaks code
  }
})

function setMainImage(selectedImage) {
  mainImage.src = selectedImage.src;
  imageName.textContent = selectedImage.title;

}
