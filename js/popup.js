document.addEventListener('DOMContentLoaded', (event) => {
    const openPopupBtn = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
        
        setTimeout(() => {
            popup.style.display = 'none';
        }, 5000); // Adjust time in milliseconds as needed
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup if user clicks outside of popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
