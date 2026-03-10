const waBtn = document.getElementById('wa-widget-btn');
const waPopup = document.getElementById('wa-widget-popup');
const waClose = document.getElementById('wa-close-btn');
waBtn.addEventListener('click', () => {
  waPopup.classList.toggle('open');
  waBtn.classList.toggle('open');
});
waClose.addEventListener('click', (e) => {
  e.stopPropagation();
  waPopup.classList.remove('open');
  waBtn.classList.remove('open');
});
// Add photos later:
// document.getElementById('avatar1').innerHTML = '<img src="images/sebastien.jpg">';
// document.getElementById('avatar2').innerHTML = '<img src="images/felicien.jpg">';