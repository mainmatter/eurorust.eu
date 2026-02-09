document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.nav__menu_btn');
  const menu = document.querySelector('.nav__links');


  menuButton.addEventListener('click', function () {
    menu.classList.toggle('open');
  });



  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove('open');
    }
  });
});