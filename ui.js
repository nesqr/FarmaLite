// ui.js (Versión Híbrida Completa y Definitiva)

// SOLO importamos datos que NO son críticos para la carga inicial de la UI.
import { frasesLovable } from './data/lovable.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS DE LA PANTALLA DE INICIO (Viven aquí para asegurar la carga) ---
    const perlas = ["El omeprazol no 'protege' el estómago, inhibe la bomba de protones.", "La vida media del Diazepam es larga por sus metabolitos activos.", "Nunca combines un IECA con un ARA-II."];
    const fichasDestacadas = [{ titulo: "Inhibidores de la ECA (IECA)", resumen: "Su RAM más característico es la tos seca.", seccion: "cardiovascular" }];
    const flashcardsRapidas = [{ pregunta: "¿Vía que evita el primer paso hepático?", respuesta: "Intravenosa (IV)" }];
    const preguntasRapidas = [{ pregunta: "¿Antídoto para intoxicación por Benzodiacepinas?", opciones: ["Naloxona", "Flumazenilo", "Atropina"], correcta: 1, explicacion: "El Flumazenilo es un antagonista competitivo del receptor GABA-A." }];

    // --- 2. ELEMENTOS PERSISTENTES DEL DOM ---
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

    // --- 3. PLANTILLA HTML ---
    const homeHTML = `<div class="search-container"><input type="search" id="search-bar" placeholder="Buscar un fármaco, tema..."></div><div id="home-layout"><div class="dashboard-card hero-card" id="ficha-card"><h3 class="card-title" id="ficha-title"></h3><p class="card-content" id="ficha-resumen"></p><button class="btn" id="ficha-btn">Leer más</button></div><div class="secondary-grid"><div class="dashboard-card" id="perla-card"><h3 class="card-title">🧠 Perla del día</h3><p class="card-content" id="perla-text"></p></div><div class="dashboard-card flashcard-container" id="flashcard-card"><div class="flashcard-inner"><div class="flashcard-front"><h3 class="card-title">🎴 Flashcard</h3><p class="card-content" id="flashcard-pregunta"></p><p class="flip-indicator">Toca para ver la respuesta</p></div><div class="flashcard-back"><h3 class="card-title">Respuesta</h3><p class="card-content" id="flashcard-respuesta"></p></div></div></div><div class="dashboard-card" id="pregunta-card"><h3 class="card-title">❓ Pregunta rápida</h3><p class="card-content" id="pregunta-text"></p><div class="options-container" id="pregunta-opciones"></div><p class="feedback" id="pregunta-feedback"></p></div><div class="dashboard-card" id="lovable-card"><h3 class="card-title">💬 Lovable dice...</h3><p class="card-content" id="lovable-frase"></p></div></div></div>`;

    // --- 4. FUNCIONES ---
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const renderHomePage = () => {
        if (!contentArea) return;
        contentArea.innerHTML = homeHTML;
        
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
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    opcionesContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
                    button.classList.add(index === pregunta.correcta ? 'correct' : 'incorrect');
                    if (index !== pregunta.correcta) {
                        opcionesContainer.children[pregunta.correcta]?.classList.add('correct');
                    }
                    contentArea.querySelector('#pregunta-feedback').textContent = pregunta.explicacion;
                    contentArea.querySelector('#pregunta-feedback').style.display = 'block';
                }, { once: true });
                opcionesContainer.appendChild(button);
            });
        }

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

    // --- 5. EVENT LISTENERS Y INICIALIZACIÓN ---
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

    // La lógica de los botones de tema y fuente la añadiremos después para no complicar la depuración.
    
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

    // Carga inicial
    renderHomePage();
    console.log("FarmaLite UI: Modo Híbrido funcionando.");
});
