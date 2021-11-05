const formSignup = document.getElementById('signup_form');
const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email_signup = document.getElementById('email');
const password_signup = document.getElementById('password_signup');

formSignup.addEventListener('submit', event => {  
  event.preventDefault();
  validateInput();
  if (Auth) {
    event.currentTarget.submit();
  } 
});

validateEmail = (email_signup) => {
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email_signup);
}
validateUsername = (username) => {
  return /^[a-zA-Z0-9]{3,29}$/.test(username);
}
validatePassword = (password_signup) => {
  return /^[a-z0-9_-].{6,12}$/.test(password_signup);
}

function errorMsg(input, message) {
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  formControl.className = 'isValid error';
  span.innerText = message;
}

function successMsg(input) {
  const formSignup = input.parentElement;
  formSignup.className = 'isValid success';
}

var Auth;

validateInput = () => {

  const userInput = username.value.trim();
  const lastnameInput = lastname.value.trim();
  const passwordInput = password_signup.value.trim();
  const emailInput = email_signup.value.trim();


  if (userInput === ''){
    errorMsg(username, 'Name is required')
    Auth = false
  }
  else if ((!(/^[A-Z-a-z]{3,29}$/).test(userInput))){
    errorMsg(username, 'Username must be at least 3 characters')
    Auth = false
  }
  else {
    successMsg(username)
    Auth = true;
  };
  //=====
  if (lastnameInput === ''){
    errorMsg(lastname, 'Last name is required')
    Auth = false
  }
  else {
    successMsg(lastname)
  }
  //=====
  if (emailInput === ''){
    errorMsg(email_signup, 'Email is required')
    Auth = false
  }
  else if (!(/[^@ \t\r\n]+@[^@ \t\r\n]+/.test(emailInput))) {
    errorMsg(email_signup, 'Please enter a valid email')
    Auth = false
  } else {
    successMsg(email_signup)
    Auth = true;
  }
  //=====
  if (passwordInput === ''){
    errorMsg(password_signup, 'Password is required')
    Auth = false
  } 
  else if ((!(/^[a-z-A-Z-0-9]{6,12}$/).test(passwordInput))){
    errorMsg(password_signup, 'Password must be in 6 to 12 characters')
    Auth = false
  }
  else {
    successMsg(password_signup)
    Auth = true;
  }

  return Auth;
}