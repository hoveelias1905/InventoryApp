document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.app-sidebar');
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const cartBody = document.getElementById('cart-body');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const sections = document.querySelectorAll('main > section[id]');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }

    const setActiveLink = (id) => {
        sidebarLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
        });
    };

    const showSection = (id) => {
        const targetId = id && document.getElementById(id) ? id : 'pos';
        sections.forEach((section) => {
            section.hidden = section.id !== targetId;
        });
        setActiveLink(targetId);
    };

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href')?.replace('#', '');
            if (targetId && document.getElementById(targetId)) {
                event.preventDefault();
                window.location.hash = targetId;
            }
            if (sidebar) {
                sidebar.classList.remove('is-open');
            }
        });
    });

    window.addEventListener('hashchange', () => {
        showSection(window.location.hash.replace('#', ''));
    });

    const cart = [];

    const formatCurrency = (value) => `$${value.toFixed(2)}`;

    const renderCart = () => {
        if (!cartBody) return;

        cartBody.innerHTML = '';

        if (!cart.length) {
            cartBody.innerHTML = '<tr><td colspan="3">No items added yet.</td></tr>';
            if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
            if (taxEl) taxEl.textContent = formatCurrency(0);
            if (totalEl) totalEl.textContent = formatCurrency(0);
            return;
        }

        let subtotal = 0;

        cart.forEach((item) => {
            subtotal += item.price * item.quantity;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>${formatCurrency(item.price * item.quantity)}</td>`;
            cartBody.appendChild(row);
        });

        const tax = subtotal * 0.16;
        const total = subtotal + tax;

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (taxEl) taxEl.textContent = formatCurrency(tax);
        if (totalEl) totalEl.textContent = formatCurrency(total);
    };

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = Number(button.getAttribute('data-price'));
            const existing = cart.find((item) => item.name === name);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            renderCart();
        });
    });

    const updateLayout = () => {
        const shell = document.querySelector('.app-shell');
        if (!shell) return;

        if (window.innerWidth <= 1080) {
            shell.classList.add('is-mobile');
        } else {
            shell.classList.remove('is-mobile');
            if (sidebar) {
                sidebar.classList.remove('is-open');
            }
        }
    };

    window.addEventListener('resize', updateLayout);
    showSection(window.location.hash.replace('#', ''));
    renderCart();
    updateLayout();
});
