const formSignIn = document.getElementById('login_form');

const email_signIn = document.getElementById('mail');
const password_signIn = document.getElementById('password');



validateEmail = (email_signIn) => {
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email_signIn);
}
validatePassword = (password_signIn) => {
  return /^[a-zA-Z0-9_-]{6,}$/.test(password_signIn);
}

formSignIn.addEventListener('submit', event => {  
  event.preventDefault();
  validateLogin();
  if (validateEmail(email_signIn.value) &&
    validatePassword(password_signIn.value)) {
      event.currentTarget.submit();
  }
});

errorMsg = (input, message) => {
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  formControl.className = 'isValid error';
  span.innerText = message;
}

successMsg=(input) =>{
  const formSignIn = input.parentElement;
  formSignIn.className = 'isValid success';
}

validateLogin = () => {
  const emailInput = email_signIn.value.trim();
  const passwordInput = password_signIn.value.trim();


  //=====
  if (emailInput === '')
    errorMsg(email_signIn, 'Email is required')
  else if (!(validateEmail(emailInput))) 
    errorMsg(email_signIn, 'Please enter a valid email')
  else 
    successMsg(email_signIn)
  //=====
  if (passwordInput === '')
    errorMsg(password_signIn, 'Password is required')
  else if((passwordInput.length < 6))
    errorMsg(password_signIn, 'Password must be at least 6 characters')
  else 
    successMsg(password_signIn)
}