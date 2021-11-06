const formSignup = document.getElementById('signup_form');
const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email_signup = document.getElementById('email');
const password_signup = document.getElementById('password_signup');


validateEmail = (email_signup) => {
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email_signup);
}
validateUsername = (username) => {
  return /^[a-zA-Z0-9]{3,29}$/.test(username);
}
validatePassword = (password_signup) => {
  return /^[a-z0-9_-].{6,12}$/.test(password_signup);
}


formSignup.addEventListener('submit', event => {  
  event.preventDefault();
  validateInput();
  if (validateUsername(document.getElementById('username').value) &&
    validateEmail(document.getElementById('email').value) &&
    validatePassword(document.getElementById('password_signup').value)) {
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

  const userInput = username.value.trim();
  const lastnameInput = lastname.value.trim();
  const passwordInput = password_signup.value.trim();
  const emailInput = email_signup.value.trim();

  if (userInput === '')
    errorMsg(username, 'Name is required')
  else if ((!(/^[A-Z-a-z]{3,29}$/).test(userInput)))
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
  else if (!(/[^@ \t\r\n]+@[^@ \t\r\n]+/.test(emailInput))) 
    errorMsg(email_signup, 'Please enter a valid email')
  else 
    successMsg(email_signup)
  //=====
  if (passwordInput === '')
    errorMsg(password_signup, 'Password is required')
  else if ((!(/^[a-z-A-Z-0-9]{6,12}$/).test(passwordInput)))
    errorMsg(password_signup, 'Password must be in 6 to 12 characters')
  else 
    successMsg(password_signup)
  
}

function ResetForm() {
  //resets the input data
  document.getElementById("signup_form").reset();
  //resets the err messages
  successMsg(username)
  successMsg(lastname)
  successMsg(email_signup)
  successMsg(password_signup)

}