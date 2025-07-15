// ui.js - Versión Completa con todas las funcionalidades integradas

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS DE EJEMPLO (Para la pantalla de inicio) ---
    const perlas = ["La rifampicina se lleva mal con todo. Especialmente con los anticonceptivos.", "Los IECA dan tos. Como tu ex, pero menos emocional."];
    const frasesLovable = ["Dormir no es opcional. Pero si decides no hacerlo, al menos aprende los efectos del midazolam.", "No lo sabes todo. Pero puedes saber esto.", "Recetar sin saber las interacciones es como mandar un WhatsApp a tu ex. Mala idea."];

    // --- 2. ELEMENTOS DEL DOM ---
    const body = document.body;
    const html = document.documentElement;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');

    // --- 3. FUNCIONES ---

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // --- Lógica de UI (Menú, Tema, Fuente) ---
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
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
        const saludoElement = document.getElementById('saludo-usuario');
        const subtextoElement = document.getElementById('saludo-subtexto');
        const saludos = ["¡Vamos al grano, crack!", "¿Listo para farmaceutear?", "Hoy se estudia o se estudia."];

        if (saludoElement) saludoElement.textContent = `Hola, ${nombre}.`;
        if (subtextoElement) subtextoElement.textContent = getRandomItem(saludos);
    };

    const initNombre = () => {
        const nombreGuardado = localStorage.getItem('nombreUsuario');
        if (nombreGuardado) {
            actualizarSaludo(nombreGuardado);
        } else {
            // Si no hay nombre, se le preguntará al hacer clic en el menú
            const saludoElement = document.getElementById('saludo-usuario');
            if(saludoElement) saludoElement.textContent = '¡Bienvenido a FarmaLite!';
        }
    };
    
    const populateDashboard = () => {
        const perlaText = document.getElementById('perla-text');
        if(perlaText) perlaText.textContent = getRandomItem(perlas);
        
        const lovableHomeFrase = document.getElementById('lovable-home-frase');
        if(lovableHomeFrase) lovableHomeFrase.textContent = getRandomItem(frasesLovable);
    };

    // --- 4. ASIGNACIÓN DE EVENT LISTENERS ---

    // Listeners persistentes
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
        if (item.dataset.action === "cambiar-nombre") {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMenu(); // Cierra el menú
                cambiarNombre(); // Llama a la función para cambiar el nombre
            });
        }
        // Aquí irá la lógica para las otras secciones
    });

    // --- 5. INICIALIZACIÓN ---
    
    // Cargar preferencias guardadas
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'font-medium';
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    
    // Cargar contenido inicial
    initNombre();
    populateDashboard();

    console.log("FarmaLite: Todos los sistemas en línea.");
});
