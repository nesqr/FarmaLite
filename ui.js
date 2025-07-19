// ui.js - Versión final para el nuevo diseño de dashboard

// 1. IMPORTACIONES
// El script necesita estos dos archivos en la carpeta /data para funcionar.
import { perlas, repasosExamen, triviasExpres } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

// 2. EVENTO PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {

    // --- 3. ELEMENTOS DEL DOM ---
    const body = document.body;
    const html = document.documentElement;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Plantilla HTML del dashboard
    const homeHTML = `
        <div id="home-dashboard">
            <div class="dashboard-card welcome-card">
                <h2 id="saludo-usuario"></h2>
            </div>
            <div class="dashboard-card" id="perla-card">
                <h3 class="card-title">💡 Perla del Día</h3>
                <p class="card-content" id="perla-text"></p>
            </div>
            <div class="dashboard-card" id="ultima-visita-card" style="display: none;">
                <h3 class="card-title">📚 Última sección visitada</h3>
                <button class="btn" id="continuar-btn"></button>
            </div>
            <div class="dashboard-card wide-card" id="repaso-card">
                <h3 class="card-title">🧠 Repasa en 3 minutos</h3>
                <button class="btn"></button>
            </div>
            <div class="dashboard-card" id="lovable-home-card">
                <h3 class="card-title">🤖 Lovable dice...</h3>
                <p class="card-content" id="lovable-home-frase"></p>
            </div>
            <div class="dashboard-card" id="entrenamiento-card">
                <h3 class="card-title">🎲 Entrenamiento exprés</h3>
                <button class="btn"></button>
            </div>
            <div class="dashboard-card wide-card" id="explorar-card">
                <h3 class="card-title">🗂️ Explora Secciones</h3>
                <div class="explorar-grid">
                    <button class="seccion-btn">F. General</button>
                    <button class="seccion-btn">F. Clínica</button>
                </div>
            </div>
        </div>`;

    // --- 4. FUNCIONES ---

    const getRandomItem = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;
    
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const applyTheme = (theme) => { /* ... (sin cambios) ... */ };
    const applyFontSize = (sizeClass) => { /* ... (sin cambios) ... */ };

    const renderHomePage = () => {
        contentArea.innerHTML = homeHTML;
        initNombre();
        populateDashboard();
    };

    const renderTopicPage = (data) => {
        contentArea.innerHTML = `<div class="topic-page"><h1>${data.titulo}</h1><article class="topic-theory">${data.teoria}</article><div class="topic-actions">${data.flashcards?.length ? `<div class="action-card"><h3>🎴 Flashcards</h3><p>${data.flashcards.length} tarjetas.</p><button class="btn">Practicar</button></div>` : ''}${data.test?.length ? `<div class="action-card"><h3>❓ Test</h3><p>${data.test.length} preguntas.</p><button class="btn">Evaluar</button></div>` : ''}</div></div>`;
    };

    const renderErrorPage = () => {
        contentArea.innerHTML = `<div class="topic-page"><h1>🚧 En Construcción</h1><p>El contenido para esta sección estará disponible pronto.</p></div>`;
    };
    
    const navigateTo = async (section) => {
        if (sideMenu.classList.contains('is-open')) toggleMenu();

        if (section === 'home') {
            renderHomePage();
            return;
        }
        
        // Guarda la última sección visitada
        localStorage.setItem('ultimaSeccionVisitada', section);

        try {
            // Esta ruta dinámica es la que hace toda la magia
            const path = `./data/FarmacologiaGeneral/${section}.js`;
            const module = await import(path);
            renderTopicPage(module[section]);
        } catch (error) {
            console.error(`Fallo al cargar la sección '${section}':`, error);
            renderErrorPage();
        }
    };
    
    const cambiarNombre = () => { /* ... (sin cambios) ... */ };
    const actualizarSaludo = (nombre) => { /* ... (sin cambios) ... */ };

    const initNombre = () => {
        const nombreGuardado = localStorage.getItem('nombreUsuario');
        const saludoElement = document.getElementById('saludo-usuario');
        if (nombreGuardado) {
            if(saludoElement) saludoElement.textContent = `Hola, ${nombreGuardado}.`;
        } else {
            if (saludoElement) saludoElement.textContent = '¡Bienvenido a FarmaLite!';
            setTimeout(cambiarNombre, 1500);
        }
    };

    const populateDashboard = () => {
        const perlaText = document.getElementById('perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        const lovableHomeFrase = document.getElementById('lovable-home-frase');
        if (lovableHomeFrase) lovableHomeFrase.textContent = getRandomItem(frasesLovable);

        const ultimaVisita = localStorage.getItem('ultimaSeccionVisitada');
        const ultimaVisitaCard = document.getElementById('ultima-visita-card');
        if(ultimaVisita && ultimaVisitaCard) {
            const continuarBtn = document.getElementById('continuar-btn');
            // Formateamos el nombre para que se vea mejor
            const nombreBonito = ultimaVisita.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            continuarBtn.textContent = `Continuar en: ${nombreBonito}`;
            ultimaVisitaCard.style.display = 'flex';
        }
    };
    
    // --- 5. EVENT LISTENERS Y INICIALIZACIÓN ---

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const section = item.dataset.section;
            const action = item.dataset.action;

            if (section) {
                navigateTo(section);
            } else if (action === "cambiar-nombre") {
                toggleMenu();
                setTimeout(cambiarNombre, 300);
            } else if (action === "mostrar-perla") {
                toggleMenu();
                alert(`Perla del Día:\n\n${getRandomItem(perlas)}`);
            }
        });
    });

    menuCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        header.addEventListener('click', () => {
            category.classList.toggle('open');
            const submenu = category.querySelector('.submenu');
            if (submenu) submenu.style.maxHeight = category.classList.contains('open') ? `${submenu.scrollHeight}px` : null;
        });
    });
    
    // Aquí irían los listeners de themeToggle y fontSizeToggle
    
    // Carga inicial
    renderHomePage();
});
