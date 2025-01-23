const navButtons = document.querySelectorAll(".nav-container");
const navScreen = document.querySelector(".navbar");
const cancelNav = document.getElementById("nav-cancel");
const signUpScreen = document.querySelector(".newlogin");
const signUpIcons = document.querySelectorAll(".signup-container");

signUpIcons.forEach((signUpIcon) => {
  signUpIcon.addEventListener("click", function (event) {
    event.preventDefault();
    signUpScreen.classList.toggle("activate-signup");
  });
});

navButtons.forEach((navButton) => {
  navButton.addEventListener("click", function (event) {
    event.preventDefault();
    navScreen.classList.toggle("active");
  });
});

cancelNav.addEventListener("click", function (event) {
  event.preventDefault();
  navScreen.classList.toggle("active");
});

// Select the headers
// const defaultHeader = document.getElementById('default-header');
// const scrollHeader = document.getElementById('scroll-header');

//Track scroll position

// window.addEventListener('scroll', () => {
//   const currentScrollY = window.scrollY;

//   if (currentScrollY > defaultHeader.offsetHeight) {
//     Scrolling down
//     defaultHeader.classList.add('hidden'); // Fade out default header
//     scrollHeader.classList.add('show'); // Slide in scroll header
//   } else if (currentScrollY < lastScrollY) {
//     Scrolling up
//     defaultHeader.classList.remove('hidden'); // Fade in default header
//     scrollHeader.classList.remove('show'); // Slide out scroll header
//   }

//   lastScrollY = currentScrollY; // Update scroll position
// });
