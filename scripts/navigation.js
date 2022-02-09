const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.navigation-menu')
hamburger.addEventListener('click', mobileMenu)
function mobileMenu() {
  hamburger.classList.toggle('active')
  navMenu.classList.toggle('active')
  document.body.classList.toggle('fixed')
}
