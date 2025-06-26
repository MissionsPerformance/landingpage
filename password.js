document.addEventListener('DOMContentLoaded', function() {
    // Ensure this password is kept secure and not exposed in production environments
    const password = "NewYork2025";

    const modal = document.getElementById('password-modal');
    const pageContent = document.getElementById('page-content');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');

    // If the modal or page content doesn't exist, do nothing.
    if (!modal || !pageContent || !passwordForm) {
        if(pageContent) pageContent.removeAttribute('style'); // Make sure content is visible if modal is missing
        return;
    }

    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (passwordInput.value === password) {
            // Correct password: hide modal and show content by removing the inline style
            modal.style.display = 'none';
            pageContent.removeAttribute('style');
        } else {
            // Incorrect password
            alert("Incorrect password. Please try again.");
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
});
