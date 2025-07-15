// Importamos los datos que necesitamos para la pantalla de inicio
import { perlas, fichasDestacadas, flashcardsRapidas, preguntasRapidas } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

// Todo el código se ejecuta cuando el HTML está completamente cargado y listo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTOS DEL DOM (PERSISTENTES) ---
    const body = document.body;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Plantilla HTML del dashboard para poder reconstruirlo dinámicamente
    const homeHTML = `
        <div class="search-container"><input type="search" id="search-bar" placeholder="Buscar un fármaco, tema..."></div>
        <div id="home-layout">
            <div class="dashboard-card hero-card" id="ficha-card"><h3 class="card-title" id="ficha-title"></h3><p class="card-content" id="ficha-resumen"></p><button class="btn" id="ficha-btn">Leer más</button></div>
            <div class="secondary-grid">
                <div class="dashboard-card" id="perla-card"><h3 class="card-title">🧠 Perla del día</h3><p class="card-content" id="perla-text"></p></div>
                <div class="dashboard-card flashcard-container" id="flashcard-card"><div class="flashcard-inner"><div class="flashcard-front"><h3 class="card-title">🎴 Flashcard</h3><p class="card-content" id="flashcard-pregunta"></p><p class="flip-indicator">Toca para ver la respuesta</p></div><div class="flashcard-back"><h3 class="card-title">Respuesta</h3><p class="card-content" id="flashcard-respuesta"></p></div></div></div>
                <div class="dashboard-card" id="pregunta-card"><h3 class="card-title">❓ Pregunta rápida</h3><p class="card-content" id="pregunta-text"></p><div class="options-container" id="pregunta-opciones"></div><p class="feedback" id="pregunta-feedback"></p></div>
                <div class="dashboard-card" id="lovable-card"><h3 class="card-title">💬 Lovable dice...</h3><p class="card-content" id="lovable-frase"></p></div>
            </div>
        </div>`;

    // --- 2. FUNCIONES ---

    const getRandomItem = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;
    
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const renderHomePage = () => {
        contentArea.innerHTML = homeHTML;
        // Rellenamos el contenido con los datos importados
        const perlaText = contentArea.querySelector('#perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        const lovableFraseEl = contentArea.querySelector('#lovable-frase');
        if (lovableFraseEl) lovableFraseEl.textContent = getRandomItem(frasesLovable);

        // ... (Aquí iría el resto de la lógica para rellenar las otras tarjetas)
        
        // Asignamos listeners a los elementos que acabamos de crear
        contentArea.querySelector('#flashcard-card')?.addEventListener('click', e => e.currentTarget.classList.toggle('is-flipped'));
    };

    const renderTopicPage = (data) => {
        contentArea.innerHTML = `<div class="topic-page"><h1>${data.titulo}</h1><article class="topic-theory">${data.teoria}</article></div>`;
    };

    const renderErrorPage = () => {
        contentArea.innerHTML = `<div class="topic-page"><h1>🚧 En Construcción</h1></div>`;
    };

    const navigateTo = async (section) => {
        if (sideMenu.classList.contains('is-open')) toggleMenu();

        if (section === 'home') {
            renderHomePage();
            return;
        }
        try {
            const path = `./data/FarmacologiaGeneral/${section}.js`;
            const module = await import(path);
            renderTopicPage(module[section]);
        } catch (error) {
            console.error(`Fallo al cargar la sección '${section}':`, error);
            renderErrorPage();
        }
    };
    
    // --- 3. EVENT LISTENERS Y INICIALIZACIÓN ---

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.section);
        });
    });

    menuCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        header.addEventListener('click', () => {
            const submenu = category.querySelector('.submenu');
            category.classList.toggle('open');
            if (submenu) submenu.style.maxHeight = category.classList.contains('open') ? `${submenu.scrollHeight}px` : null;
        });
    });

    renderHomePage(); // Carga la página de inicio por defecto
    console.log("FarmaLite UI Modular: Lista.");
});
