const formSignup = document.getElementById('signup_form');
const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email_signup = document.getElementById('email');
const password_signup = document.getElementById('password_signup');


validateEmail = (email_signup) => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email_signup);
}
validateUsername = (username) => {
  return /^[a-z0-9_-]{3,15}$/.test(username);
}
validatePassword = (password_signup) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(password_signup);
}


formSignup.addEventListener('submit', event => {  
  event.preventDefault();
  validateInput();
  if (validateUsername(username.value) &&
    validateEmail(email_signup.value) &&
    validatePassword(password_signup.value)) {
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
  const formSignup = input.parentElement;
  formSignup.className = 'isValid success';
}

validateInput = () => {
  const usernameInput = username.value.trim();
  const lastnameInput = lastname.value.trim();
  const passwordInput = password_signup.value.trim();
  const emailInput = email_signup.value.trim();

  if (usernameInput === '')
    errorMsg(username, 'Username is required')
  else if (!(validateUsername(usernameInput)))
    errorMsg(username, 'Username must be at least 3 characters')
  else 
    successMsg(username)
  //=====
  if (lastnameInput === '')
    errorMsg(lastname, 'Last name is required')
  else 
    successMsg(lastname)
  //=====
  if (emailInput === '')
    errorMsg(email_signup, 'Email is required')
  else if (!(validateEmail(emailInput))) 
    errorMsg(email_signup, 'not a valid email')
  else 
    successMsg(email_signup)
  //=====
  if (passwordInput === '')
    errorMsg(password_signup, 'Password is required')
  else if((passwordInput.length < 6))
    errorMsg(password_signup, 'Password must be at least 6 characters')
  else if (!(validatePassword(passwordInput)))
    errorMsg(password_signup, 'Password must contain uppercase,\nlowercase letters with digit(s)')
  else 
    successMsg(password_signup)
}

//closes the registration form and resets data
ResetForm = () => {
  //resets the input data
  document.getElementById("signup_form").reset();
  //resets the err messages
  successMsg(username)
  successMsg(lastname)
  successMsg(email_signup)
  successMsg(password_signup)
}