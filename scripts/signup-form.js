const formSignup = document.getElementById('signup_form');

const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email_signup = document.getElementById('email');
const password = document.getElementById('password');


validateEmail = (email_signup) => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email_signup);
}
validateUsername = (username) => {
  return /^[a-zA-Z0-9-_( )]{3,12}$/.test(username);
}
validateLastname = (lastname) => {
  return /^[a-zA-Z0-9-_( )]{3,}$/.test(lastname);
}
validatePassword = (password) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(password);
}


formSignup.addEventListener('submit', event => {
  event.preventDefault();
  validateInput();
  if (validateUsername(username.value) &&
    validateLastname(lastname.value) &&
    validateEmail(email_signup.value) &&
    validatePassword(password.value)) {
    event.currentTarget.submit();
  }
});


errorMsg = (input, message) => {
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  formControl.className = 'isValid error';
  span.innerText = message;
}

successMsg = (input) => {
  const formSignup = input.parentElement;
  formSignup.className = 'isValid success';
}

validateInput = () => {
  const usernameInput = username.value.trim();
  const lastnameInput = lastname.value.trim();
  const passwordInput = password.value.trim();
  const emailInput = email_signup.value.trim();

  if (usernameInput === '')
    errorMsg(username, 'Username is required')
  else if (usernameInput.length < 3)
    errorMsg(username, "Username must be at least 3 characters")
  else if (usernameInput.length > 12)
    errorMsg(username, 'Username can be max 12 characters')
  else if (!(validateUsername(usernameInput)))
    errorMsg(username, 'Invalid characters in username')
  else
    successMsg(username)
  //=====
  if (lastnameInput === '')
    errorMsg(lastname, 'Lastname is required')
  else if (lastnameInput.length < 3)
    errorMsg(lastname, "Lastname must be at least 3 characters")
  else if (!(validateLastname(lastnameInput)))
    errorMsg(lastname, 'Invalid characters in lastname')
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
    errorMsg(password, 'Password is required')
  else if ((passwordInput.length < 6))
    errorMsg(password, 'Password must be at least 6 characters')
  else if (!(validatePassword(passwordInput)))
    errorMsg(password, 'Password must contain uppercase,\nlowercase letters with digit(s)')
  else
    successMsg(password)
}

//closes the registration form and resets data
ResetForm = () => {
  //resets the input data
  document.getElementById("signup_form").reset();
  //resets the err messages
  successMsg(username)
  successMsg(lastname)
  successMsg(email_signup)
  successMsg(password)
}