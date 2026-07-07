document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const updateLayout = () => {
        const shell = document.querySelector('.app-shell');
        if (!shell) return;

        if (window.innerWidth <= 1080) {
            shell.classList.add('is-mobile');
        } else {
            shell.classList.remove('is-mobile');
        }
    };

    window.addEventListener('resize', updateLayout);
    updateLayout();
});
