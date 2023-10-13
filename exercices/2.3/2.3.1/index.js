const form = document.querySelector('form');
const souhait = document.querySelector('#souhaitEntre');
const messageDiv = document.querySelector('#souhait');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.display = 'none';
  messageDiv.innerText = `Votre souhait :
    ${souhait.value}`;
});