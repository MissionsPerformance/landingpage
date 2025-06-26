document.addEventListener('DOMContentLoaded', function() {
    const password = "NewYork2025";

    const modal = document.getElementById('password-modal');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');


    // Obfuscate the page content initially
    if(mainContent) mainContent.style.display = 'none';
    if(header) header.style.display = 'none';
    if(footer) footer.style.display = 'none';


    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (passwordInput.value === password) {
            modal.style.display = 'none';
            if(mainContent) mainContent.style.display = 'block';
            if(header) header.style.display = 'block';
            if(footer) footer.style.display = 'block';

        } else {
            alert("Incorrect password. Please try again.");
            passwordInput.value = '';
        }
    });
});
