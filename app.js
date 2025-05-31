```
// Modo oscuro
function initializeDarkMode() {
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const body = document.body;

    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (toggleDarkMode) {
            toggleDarkMode.textContent = '🌓 Modo Claro';
        }
    } else {
        body.classList.remove('dark-mode');
        if (toggleDarkMode) {
            toggleDarkMode.textContent = '🌓 Modo Oscuro';
        }
    }

    // Evento para alternar modo oscuro
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleDarkMode.textContent = '🌓 Modo Claro';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                toggleDarkMode.textContent = '🌓 Modo Oscuro';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
}

// Selector de tamaño de fuente
function initializeFontSize() {
    const fontSizeLinks = document.querySelectorAll('.dropdown-item[data-font]');
    const body = document.body;
    const fontSizes = {
        'small': 'font-small',
        'normal': 'font-normal',
        'large': 'font-large',
        'extra-large': 'font-extra-large'
    };

    // Cargar preferencia de tamaño de fuente
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize && fontSizes[savedFontSize]) {
        body.classList.add(fontSizes[savedFontSize]);
    }

    // Evento para cambiar tamaño de fuente
    fontSizeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const fontSize = e.target.getAttribute('data-font');
            Object.values(fontSizes).forEach(cls => body.classList.remove(cls));
            body.classList.add(fontSizes[fontSize]);
            localStorage.setItem('fontSize', fontSize);
        });
    });
}

// Búsqueda simple (placeholder)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log('Buscando:', query);
        });
    }
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeFontSize();
    initializeSearch();
});
```