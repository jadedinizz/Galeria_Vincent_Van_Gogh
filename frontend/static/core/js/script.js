function abrirModal(src) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'flex';
  modalImg.src = src;
}
function fecharModal(){
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.getElementById('modal-img').src = '';
}
