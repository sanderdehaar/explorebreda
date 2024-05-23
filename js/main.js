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

document.addEventListener("DOMContentLoaded", function() {
    const storiesDrop = document.getElementById('stories-drop');
    const heroBanner = document.getElementById('hero-banner');
    const storiesMenu = document.getElementById('stories-menu');
    const overlayBanner = document.querySelector('.overlay-banner');
    let timeoutId;

    function showStoriesMenu() {
        // heroBanner.style.display = 'none';
        storiesMenu.style.display = 'flex';
        // overlayBanner.style.display = 'none';
        heroBanner.style.zIndex = '1';
        overlayBanner.style.zIndex = '1';
        header.classList.add('is-active');
    }

    function hideStoriesMenu() {
        // heroBanner.style.display = 'block';
        storiesMenu.style.display = 'none';
        // overlayBanner.style.display = 'block';
        heroBanner.style.zIndex = '2';
        overlayBanner.style.zIndex = '2';
        header.classList.remove('is-active');
    }
    storiesDrop.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId); 
        showStoriesMenu();
    });
    storiesDrop.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(hideStoriesMenu, 400); 
    });
    storiesMenu.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId); 
        showStoriesMenu();
    });
    storiesMenu.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(hideStoriesMenu, 400);
    });
});