document.addEventListener('DOMContentLoaded', () => {
    console.log('FarmaLite: Scripts de app.js cargando...');

    // Búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log('Buscando:', query);
        });
    } else {
        console.log('Input de búsqueda no encontrado');
    }
});