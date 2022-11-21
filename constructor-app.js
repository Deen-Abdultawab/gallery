function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery (element) {
  this.container = element
  this.list = [...element.querySelectorAll('.img')];
  this.modal = getElement('.modal');
  this.mainImg = getElement('.main-img');
  this.modalImages = getElement('.modal-images');
  this.imageName = getElement('.image-name');
  this.closeBtn = getElement('.close-btn');
  this.nextBtn = getElement('.next-btn');
  this.prevBtn = getElement('.prev-btn');

  this.closeModal = this.closeModal.bind(this);
  this.nextImage= this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.selectImage = this.selectImage.bind(this)

  this.container.addEventListener('click', function(e){
      if(e.target.classList.contains('img')){
        this.openModal(e.target, this.list)
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage,list){
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list.map((img) => {
    return `
    <img
    src="${img.src}"
    title="${img.title}"
    id="${img.dataset.id}"
    class="${selectedImage.dataset.id === img.dataset.id? 'modal-img selected': 'modal-img'}"
    alt=""
  />
    `
  }).join('')
  this.modal.classList.add('open');

  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.selectImage)



}

Gallery.prototype.setMainImage = function(selectedImage){
  this.mainImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
}

Gallery.prototype.closeModal = function(){
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeBModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
}

Gallery.prototype.nextImage = function(){
  const selected = this.modalImages.querySelector('.selected');
  const next = selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
}

Gallery.prototype.prevImage = function(){
  const selected = this.modalImages.querySelector('.selected');
  const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
}

Gallery.prototype.selectImage = function(e) {
  if(e.target.classList.contains('modal-img')){
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    this.setMainImage(e.target);
    e.target.classList.add('selected');

  }
}

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));