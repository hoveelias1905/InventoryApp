document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-panel');
    const toggleButton = document.getElementById('mobile-nav-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const pageSections = document.querySelectorAll('.page-section');
    const inventoryRows = document.querySelectorAll('.inventory-row');
    const actionButtons = document.querySelectorAll('.item-actions button');
    const headerButtons = document.querySelectorAll('.header-actions button');

    const showSection = (sectionId = 'overview') => {
        const targetId = sectionId || 'overview';
        pageSections.forEach((section) => {
            const isActive = section.id === targetId;
            section.hidden = !isActive;
            section.classList.toggle('is-active', isActive);
        });

        sidebarLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${targetId}`;
            link.classList.toggle('active', isActive);
        });
    };

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href')?.replace('#', '');
            if (targetId) {
                event.preventDefault();
                window.location.hash = targetId;
            }
            if (sidebar) {
                sidebar.classList.remove('is-open');
            }
        });
    });

    window.addEventListener('hashchange', () => {
        showSection(window.location.hash.replace('#', '') || 'overview');
    });

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }

    inventoryRows.forEach((row) => {
        row.addEventListener('mouseenter', () => {
            row.classList.add('is-hovered');
        });

        row.addEventListener('mouseleave', () => {
            row.classList.remove('is-hovered');
        });
    });

    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const actionName = button.textContent.trim();
            const row = button.closest('.inventory-row');
            const itemName = row?.querySelector('.item-name')?.textContent || 'this item';
            window.alert(`${actionName} clicked for ${itemName}`);
        });
    });

    headerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const actionName = button.textContent.trim();
            window.alert(`${actionName} clicked`);
        });
    });

    const updateLayout = () => {
        const layout = document.querySelector('.admin-layout');
        if (!layout) return;

        if (window.innerWidth <= 1080) {
            layout.classList.add('is-mobile');
        } else {
            layout.classList.remove('is-mobile');
            if (sidebar) {
                sidebar.classList.remove('is-open');
            }
        }
    };

    window.addEventListener('resize', updateLayout);
    showSection(window.location.hash.replace('#', '') || 'overview');
    updateLayout();
});
