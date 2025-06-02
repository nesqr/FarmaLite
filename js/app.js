// Asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando app.js...');

    // Verificar si los elementos existen
    const darkModeToggle = document.getElementById('darkModeToggle');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const body = document.body;

    if (!darkModeToggle || !fontSizeSelect || !body) {
        console.error('Elementos no encontrados:', {
            darkModeToggle,
            fontSizeSelect,
            body
        });
        return; // Salir si los elementos no están presentes
    }

    console.log('Elementos encontrados, configurando eventos...');

    // Modo oscuro: Alternar clase y guardar en localStorage
    darkModeToggle.addEventListener('click', () => {
        try {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            console.log('Modo oscuro alternado:', { isDarkMode, bodyClasses: body.className });
        } catch (error) {
            console.error('Error al alternar modo oscuro:', error);
        }
    });

    // Cargar modo oscuro desde localStorage al iniciar
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        console.log('Modo oscuro cargado desde localStorage:', savedDarkMode);
    }

    // Tamaño de fuente: Cambiar clase y guardar en localStorage
    fontSizeSelect.addEventListener('change', (e) => {
        try {
            // Remover clases de tamaño previas
            body.classList.remove('font-small', 'font-normal', 'font-large');
            const newFontSize = e.target.value;
            body.classList.add(newFontSize);
            localStorage.setItem('fontSize', newFontSize);
            console.log('Tamaño de fuente cambiado:', { newFontSize, bodyClasses: body.className });
        } catch (error) {
            console.error('Error al cambiar tamaño de fuente:', error);
        }
    });

    // Cargar tamaño de fuente desde localStorage al iniciar
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        body.classList.remove('font-small', 'font-normal', 'font-large');
        body.classList.add(savedFontSize);
        fontSizeSelect.value = savedFontSize;
        console.log('Tamaño de fuente cargado desde localStorage:', savedFontSize);
    }
});

// Log adicional para confirmar que el script se cargó
console.log('app.js cargado correctamente');