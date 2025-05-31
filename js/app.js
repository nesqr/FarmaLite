document.addEventListener('DOMContentLoaded', () => {
    console.log('FarmaLite: Scripts cargando...');

    // Modo oscuro
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const body = document.body;

    if (toggleDarkMode) {
        console.log('Botón modo oscuro encontrado');
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            toggleDarkMode.textContent = '🌓 Modo Claro';
            toggleDarkMode.classList.replace('btn-outline-light', 'btn-outline-secondary');
        } else {
            toggleDarkMode.textContent = '🌓 Modo Oscuro';
            toggleDarkMode.classList.replace('btn-outline-secondary', 'btn-outline-light');
        }

        toggleDarkMode.addEventListener('click', () => {
            console.log('Alternando modo oscuro');
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleDarkMode.textContent = '🌓 Modo Claro';
                toggleDarkMode.classList.replace('btn-outline-light', 'btn-outline-secondary');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                toggleDarkMode.textContent = '🌓 Modo Oscuro';
                toggleDarkMode.classList.replace('btn-outline-secondary', 'btn-outline-light');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    } else {
        console.error('Error: Botón toggle-dark-mode no encontrado');
    }

    // Tamaño de fuente
    const fontSizeLinks = document.querySelectorAll('.dropdown-item[data-font]');
    const fontSizes = {
        'small': 'font-small',
        'normal': 'font-normal',
        'large': 'font-large',
        'extra-large': 'font-extra-large'
    };

    if (fontSizeLinks.length > 0) {
        console.log('Enlaces de tamaño de fuente encontrados:', fontSizeLinks.length);
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize && fontSizes[savedFontSize]) {
            Object.values(fontSizes).forEach(cls => body.classList.remove(cls));
            body.classList.add(fontSizes[savedFontSize]);
        }

        fontSizeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const fontSize = e.target.getAttribute('data-font');
                console.log('Cambiando tamaño de fuente a:', fontSize);
                Object.values(fontSizes).forEach(cls => body.classList.remove(cls));
                body.classList.add(fontSizes[fontSize]);
                localStorage.setItem('fontSize', fontSize);
            });
        });
    } else {
        console.error('Error: Enlaces de tamaño de fuente no encontrados');
    }

    // Búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log('Buscando:', query);
        });
    }
});
