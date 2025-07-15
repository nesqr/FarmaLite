// ui.js - Versión Completa para el Nuevo Diseño de Dashboard

// 1. IMPORTACIONES
// El script necesita estos dos archivos en la carpeta /data para funcionar.
// Si no existen, la aplicación no se iniciará.
import { perlas, repasosExamen, triviasExpres } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

// 2. EVENTO PRINCIPAL
// Todo el código se ejecuta cuando el HTML está completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // --- 3. ELEMENTOS DEL DOM ---
    // Guardamos las referencias a los elementos que usamos a menudo.
    const body = document.body;
    const html = document.documentElement;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');

    // --- 4. FUNCIONES ---

    // Función de utilidad para obtener un elemento aleatorio de un array
    const getRandomItem = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;

    // Abre y cierra el menú lateral
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    // Cambia entre modo claro y oscuro y guarda la preferencia
    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    // Cambia entre los tamaños de fuente y guarda la preferencia
    const fontClasses = ['font-small', 'font-medium', 'font-large'];
    const applyFontSize = (sizeClass) => {
        html.classList.remove(...fontClasses);
        html.classList.add(sizeClass);
        localStorage.setItem('fontSize', sizeClass);
    };

    // Lanza un prompt para cambiar el nombre y lo guarda
    const cambiarNombre = () => {
        const nombreActual = localStorage.getItem('nombreUsuario') || '';
        const nuevoNombre = prompt("¿Cómo quieres que te llame?", nombreActual);
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            localStorage.setItem('nombreUsuario', nuevoNombre);
            actualizarSaludo(nuevoNombre);
        }
    };
    
    // Actualiza el texto del saludo en la pantalla
    const actualizarSaludo = (nombre) => {
        const saludoElement = document.getElementById('saludo-usuario');
        const subtextoElement = document.getElementById('saludo-subtexto');
        const saludos = ["¿Listo para farmaceutear?", "Hoy se estudia o se estudia."];

        if (saludoElement) saludoElement.textContent = `Hola, ${nombre}.`;
        if (subtextoElement) subtextoElement.textContent = getRandomItem(saludos);
    };
    
    // Rellena las tarjetas del dashboard con contenido aleatorio
    const populateDashboard = () => {
        const perlaText = document.getElementById('perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        const lovableHomeFrase = document.getElementById('lovable-home-frase');
        if (lovableHomeFrase) lovableHomeFrase.textContent = getRandomItem(frasesLovable);

        const repasoBtn = document.querySelector('#repaso-card .btn');
        const repaso = getRandomItem(repasosExamen);
        if(repasoBtn && repaso) repasoBtn.textContent = repaso.titulo;

        const triviaBtn = document.querySelector('#entrenamiento-card .btn');
        const trivia = getRandomItem(triviasExpres);
        if(triviaBtn && trivia) triviaBtn.textContent = `¿Cuánto sabes de ${trivia.tema}?`;
    };

    // --- 5. ASIGNACIÓN DE EVENTOS ---

    // Listeners para los controles principales que siempre existen
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    fontSizeToggle.addEventListener('click', () => {
        const currentSize = localStorage.getItem('fontSize') || 'font-medium';
        const currentIndex = fontClasses.indexOf(currentSize);
        const nextIndex = (currentIndex + 1) % fontClasses.length;
        applyFontSize(fontClasses[nextIndex]);
    });

    // Asignamos listeners a todos los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu(); // Cierra el menú siempre

            const action = item.dataset.action;
            if (action === "cambiar-nombre") {
                setTimeout(cambiarNombre, 300); // Pequeño retraso para que se vea la animación del menú
            } else if (action === "mostrar-perla") {
                alert(`Perla del Día:\n\n${getRandomItem(perlas)}`);
            }
            // Aquí añadiremos la navegación a otras secciones
        });
    });

    // --- 6. INICIALIZACIÓN ---
    
    // Cargar preferencias guardadas al inicio
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'font-medium';
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    
    // Gestionar nombre de usuario
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if (nombreGuardado) {
        actualizarSaludo(nombreGuardado);
    } else {
        const saludoElement = document.getElementById('saludo-usuario');
        if (saludoElement) saludoElement.textContent = '¡Bienvenido a FarmaLite!';
        setTimeout(cambiarNombre, 1500); // Pregunta el nombre si es la primera vez
    }

    // Cargar contenido dinámico del dashboard
    populateDashboard();

    console.log("FarmaLite: Todos los sistemas en línea.");
});
