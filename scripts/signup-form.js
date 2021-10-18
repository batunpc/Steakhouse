const formSignup = document.getElementById('signup_form');
const username = document.getElementById('username');
const last_name = document.getElementById('last_name');
const email_signup = document.getElementById('mail_signup');
const password_signup = document.getElementById('password_signup');

formSignup.addEventListener('submit', event => {
  event.preventDefault();
  validateInput();
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

validateInput = () => {
  const userInput = username.value.trim();
  const last_nameInput = last_name.value.trim();
  const passwordInput = password_signup.value.trim();
  const emailInput = email_signup.value.trim();

  if (userInput === '')
    errorMsg(username, 'Name is required')
  else if ((!(/^[A-Z-a-z]{3,29}$/).test(userInput)))
    errorMsg(username, 'Username must be at least 3 characters')
  else {
    successMsg(username)
  };
  //=====
  if (last_nameInput === '')
    errorMsg(last_name, 'Last name is required')
  else {
    successMsg(last_name)
  }
  //=====
  if (emailInput === '')
    errorMsg(email_signup, 'Email is required')
  else if (!(/[^@ \t\r\n]+@[^@ \t\r\n]+/.test(emailInput))) {
    errorMsg(email_signup, 'Please enter a valid email')
  } else {
    successMsg(email_signup)
  }
  //=====
  if (passwordInput === '')
    errorMsg(password_signup, 'Password is required')
  else if ((!(/^[a-z-A-Z-0-9]{6,12}$/).test(passwordInput)))
    errorMsg(password_signup, 'Password must be in 6 to 12 characters')
  else {
    successMsg(password_signup)
  }
}