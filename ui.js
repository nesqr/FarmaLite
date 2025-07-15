// ui.js - Versión final para el nuevo diseño de dashboard

// 1. CARGA DE DATOS
// Importamos los datos que necesitaremos desde sus archivos modulares.
// Este código fallará si los archivos no existen en la carpeta /data.
import { perlas, repasosExamen, triviasExpres } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const body = document.body;
    const html = document.documentElement;
    const contentArea = document.getElementById('content-area');
    
    // Controles y Menú
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');

    // Elementos del Dashboard (pueden no existir si navegamos a otra página)
    const saludoUsuario = document.getElementById('saludo-usuario');
    const perlaText = document.getElementById('perla-text');
    const lovableHomeFrase = document.getElementById('lovable-home-frase');
    const continuarBtn = document.getElementById('continuar-btn');
    const ultimaVisitaCard = document.getElementById('ultima-visita-card');
    const repasoBtn = document.querySelector('#repaso-card .btn');
    const triviaBtn = document.querySelector('#entrenamiento-card .btn');


    // --- 3. DEFINICIÓN DE FUNCIONES ---

    const getRandomItem = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;

    // --- Funciones de UI (Menú, Tema, Fuente) ---
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    const fontClasses = ['font-small', 'font-medium', 'font-large'];
    const applyFontSize = (sizeClass) => {
        html.classList.remove(...fontClasses);
        html.classList.add(sizeClass);
        localStorage.setItem('fontSize', sizeClass);
    };

    // --- Lógica de Contenido y Navegación ---
    const cambiarNombre = () => {
        const nombreActual = localStorage.getItem('nombreUsuario') || '';
        const nuevoNombre = prompt("¿Cómo quieres que te llame?", nombreActual);
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            localStorage.setItem('nombreUsuario', nuevoNombre);
            actualizarSaludo(nuevoNombre);
        }
    };
    
    const actualizarSaludo = (nombre) => {
        if (saludoUsuario) saludoUsuario.textContent = `Hola, ${nombre}.`;
    };

    const initNombre = () => {
        const nombreGuardado = localStorage.getItem('nombreUsuario');
        if (nombreGuardado) {
            actualizarSaludo(nombreGuardado);
        } else {
            // Si es la primera vez, se lo preguntamos después de un momento
            setTimeout(cambiarNombre, 1500);
        }
    };
    
    const populateDashboard = () => {
        if(perlaText) perlaText.textContent = getRandomItem(perlas);
        if(lovableHomeFrase) lovableHomeFrase.textContent = getRandomItem(frasesLovable);
        
        // Lógica para el botón de continuar (lee de localStorage)
        const ultimaVisita = localStorage.getItem('ultimaSeccionVisitada');
        if (ultimaVisita && continuarBtn && ultimaVisitaCard) {
            continuarBtn.textContent = `Continuar en: ${ultimaVisita}`;
            ultimaVisitaCard.style.display = 'flex';
        }
        
        // Lógica para los botones de repaso y trivia
        const repaso = getRandomItem(repasosExamen);
        if(repasoBtn && repaso) repasoBtn.dataset.section = repaso.seccion;

        const trivia = getRandomItem(triviasExpres);
        if(triviaBtn && trivia) triviaBtn.textContent = `¿Cuánto sabes de ${trivia.tema}?`;
    };
    
    // --- 4. ASIGNACIÓN DE EVENTOS (Los "Cables") ---

    // Listeners para elementos persistentes
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

    // Asignar listeners a todos los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu(); // Cierra el menú al hacer clic

            const section = item.dataset.section;
            const action = item.dataset.action;

            if (section) {
                // Lógica de navegación a una página (la construiremos después)
                alert(`Navegando a la sección: ${section}... (próximamente)`);
            } else if (action === "cambiar-nombre") {
                cambiarNombre();
            } else if (action === "mostrar-perla") {
                alert(`Perla del Día:\n\n${getRandomItem(perlas)}`);
            }
        });
    });

    // --- 5. INICIALIZACIÓN DE LA APP ---
    
    // Cargar preferencias guardadas al inicio
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'font-medium';
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    
    // Cargar contenido inicial
    initNombre();
    populateDashboard();

    console.log("FarmaLite: Todos los sistemas en línea y funcionales.");
});
