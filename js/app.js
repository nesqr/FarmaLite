document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const body = document.body;

    // Cargar preferencias guardadas
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Modo Claro';
    }

    if (localStorage.getItem('fontSize')) {
        body.classList.remove('font-small', 'font-normal', 'font-large');
        body.classList.add(localStorage.getItem('fontSize'));
        fontSizeSelect.value = localStorage.getItem('fontSize');
    }

    // Alternar modo oscuro
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '☀️ Modo Claro';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '🌙 Modo Oscuro';
        }
    });

    // Cambiar tamaño de fuente
    fontSizeSelect.addEventListener('change', (e) => {
        body.classList.remove('font-small', 'font-normal', 'font-large');
        body.classList.add(e.target.value);
        localStorage.setItem('fontSize', e.target.value);
    });
});