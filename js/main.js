// Header toggle, change colors

const header = document.getElementById('global-header');
const dropdowns = document.querySelectorAll('.dropdown, .dropdown_row');

function handleDropdownEvents() {
    header.classList.toggle('is-active');
}

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseover', handleDropdownEvents);
    dropdown.addEventListener('mouseout', handleDropdownEvents);
});

// Toggle menu

const menuBar = document.getElementsByClassName("menu")[0];
const menuClose = document.querySelector(".close-menu");
const navigationLinks = document.querySelectorAll('#menu nav a');
const menu = document.getElementById("menu");
const body = document.body;

function toggleMenu() {
    menu.classList.toggle('is-active');
    body.classList.toggle('disable-scroll');
}

[menuBar, menuClose].forEach(item => item.addEventListener("click", toggleMenu));
navigationLinks.forEach(link => link.addEventListener('click', toggleMenu));

menu.addEventListener("click", (event) => {
    if (event.target !== menu) return;
    toggleMenu();
});