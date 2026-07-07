document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    const button = document.querySelector('.button-primary');

    if (form && button) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            button.textContent = 'Signing In...';
            button.disabled = true;

            window.setTimeout(() => {
                button.textContent = 'Signed In';
            }, 900);
        });
    }

    const handleResize = () => {
        document.body.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
});
