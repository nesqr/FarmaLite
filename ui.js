// ui.js

// Importamos los datos necesarios para la pantalla de inicio desde sus archivos modulares
import { perlas, fichasDestacadas, flashcardsRapidas, preguntasRapidas } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

// Todo el código se ejecuta cuando el HTML está completamente cargado y listo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTOS PERSISTENTES DEL DOM ---
    const body = document.body;
    const html = document.documentElement;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');
    const menuCategories = document.querySelectorAll('.menu-category');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');
    const lovableBtn = document.getElementById('lovable-btn');
    const lovableTooltip = document.getElementById('lovable-tooltip');

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

    const renderHomePage = () => {
        if (!contentArea) return;
        contentArea.innerHTML = homeHTML;

        // Seleccionamos y poblamos los elementos que acabamos de crear
        const perlaText = contentArea.querySelector('#perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        const ficha = getRandomItem(fichasDestacadas);
        if (ficha) {
            contentArea.querySelector('#ficha-title').textContent = `📘 ${ficha.titulo}`;
            contentArea.querySelector('#ficha-resumen').textContent = ficha.resumen;
        }

        const flashcard = getRandomItem(flashcardsRapidas);
        if (flashcard) {
            contentArea.querySelector('#flashcard-pregunta').textContent = flashcard.pregunta;
            contentArea.querySelector('#flashcard-respuesta').textContent = flashcard.respuesta;
        }

        const lovableFraseEl = contentArea.querySelector('#lovable-frase');
        if (lovableFraseEl) lovableFraseEl.textContent = getRandomItem(frasesLovable);
        
        const pregunta = getRandomItem(preguntasRapidas);
        if (pregunta) {
            contentArea.querySelector('#pregunta-text').textContent = pregunta.pregunta;
            const opcionesContainer = contentArea.querySelector('#pregunta-opciones');
            opcionesContainer.innerHTML = '';
            pregunta.opciones.forEach((opcion, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = opcion;
                button.addEventListener('click', () => {
                    opcionesContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
                    button.classList.add(index === pregunta.correcta ? 'correct' : 'incorrect');
                    if (index !== pregunta.correcta) {
                        opcionesContainer.children[pregunta.correcta]?.classList.add('correct');
                    }
                    const feedbackEl = contentArea.querySelector('#pregunta-feedback');
                    if (feedbackEl) {
                        feedbackEl.textContent = pregunta.explicacion;
                        feedbackEl.style.display = 'block';
                    }
                }, { once: true });
                opcionesContainer.appendChild(button);
            });
        }

        // Asignamos listeners a los elementos dinámicos que acabamos de crear
        contentArea.querySelector('#flashcard-card')?.addEventListener('click', e => e.currentTarget.classList.toggle('is-flipped'));
        contentArea.querySelector('#lovable-card')?.addEventListener('click', () => {
            if (lovableFraseEl) lovableFraseEl.textContent = getRandomItem(frasesLovable);
        });
    };
    
    const renderTopicPage = (data) => {
        contentArea.innerHTML = `<div class="topic-page"><h1>${data.titulo}</h1><article class="topic-theory">${data.teoria}</article><div class="topic-actions">${data.flashcards?.length ? `<div class="action-card"><h3>🎴 Flashcards</h3><p>${data.flashcards.length} tarjetas.</p><button class="btn">Practicar</button></div>` : ''}${data.test?.length ? `<div class="action-card"><h3>❓ Test</h3><p>${data.test.length} preguntas.</p><button class="btn">Evaluar</button></div>` : ''}</div></div>`;
    };

    const renderErrorPage = () => {
        contentArea.innerHTML = `<div class="topic-page"><h1>🚧 En Construcción</h1><p>El contenido para esta sección estará disponible pronto.</p></div>`;
    };
    
    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
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

    let isTooltipVisible = false;
    lovableBtn.addEventListener('click', () => {
        if (isTooltipVisible) return;
        const frase = getRandomItem(frasesLovable);
        if (lovableTooltip && frase) {
            lovableTooltip.textContent = frase;
            lovableTooltip.classList.add('is-visible');
            isTooltipVisible = true;
            setTimeout(() => {
                lovableTooltip.classList.remove('is-visible');
                isTooltipVisible = false;
            }, 5000);
        }
    });

    // --- Carga inicial de la aplicación ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'font-medium';
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    renderHomePage(); // Siempre empezamos mostrando la pantalla de inicio

    console.log("FarmaLite UI: Todos los sistemas en línea.");
});
