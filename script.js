// Show the modal when the page loads
window.onload = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
        document.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
};

function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = 'test'; // Change this to your desired password

    if (passwordInput === correctPassword) {
        const modal = document.getElementById('modal');
        modal.style.opacity = '0';
        document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('main-content').style.opacity = '1';
            document.getElementById('main-content').style.transform = 'translateY(0)';
        }, 500);
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = 'Access Denied';
        errorMessage.style.opacity = '1';
        setTimeout(() => {
            errorMessage.style.opacity = '0';
        }, 3000);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}