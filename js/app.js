document.addEventListener('DOMContentLoaded', () => {
    console.log('FarmaLite: Scripts cargando...');

    // Tamaño de fuente
    const fontSizeLinks = document.querySelectorAll('.font-size-option');
    const body = document.body;
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