const form = document.querySelector('.login_form');

const email = document.getElementById('email');
const password = document.getElementById('password');

const emailError = document.querySelector('#email + span.error');
const passwordError = document.querySelector('#password + span.error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  showError();
});



showError = () => {
  if (email.validity.valueMissing && password.validity.valueMissing) {
    emailError.textContent = 'Please enter e-mail address.';
    passwordError.textContent = 'Forgot your password ?';
    emailError.className = 'error active';
    passwordError.className = 'error active';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value must be an e-mail address.';
    emailError.className = 'error active';
  } else if (email.validity.valueMissing) {
    emailError.textContent = 'Enter e-mail address.';
    emailError.className = 'error active';
  } else if (password.validity.valueMissing) {
    passwordError.textContent = 'Forgot your password ?';
    passwordError.className = 'error active';
  }
} 