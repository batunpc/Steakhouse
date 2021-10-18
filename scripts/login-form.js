
    const form = document.querySelector('.login_form');

    const email = document.getElementById('mail');
    const password = document.getElementById('password');

    const emailError = document.querySelector('#mail + span.error');
    const passwordError = document.querySelector('#password + span.error');


    email.addEventListener('input', (email, password) => {
      if (email.validity.valid && password.validity.valid) {
        emailError.innerHTML = '';
        emailError.className = 'error';

        passwordError.innerHTML = '';
        passwordError.className = 'error';
      } else showError();
    });    

    form.addEventListener('submit', (event) => {
      if (!email.validity.valid) {
        showError();
        event.preventDefault();
      } else if (!password.validity.valid) {
        showError();
        event.preventDefault();
      }
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