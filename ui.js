// ui.js (Final version with correct event listener attachment)

import { perlas, fichasDestacadas, flashcardsRapidas, preguntasRapidas } from './data/home.js';
import { frasesLovable } from './data/lovable.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Persistent DOM Elements ---
    const body = document.body;
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');

    // --- 2. HTML Template for the Homepage ---
    const homeHTML = `
        <div class="search-container"><input type="search" id="search-bar" placeholder="Buscar un fármaco, tema..."></div>
        <div id="home-layout">
            <div class="dashboard-card hero-card" id="ficha-card">
                <h3 class="card-title" id="ficha-title"></h3><p class="card-content" id="ficha-resumen"></p><button class="btn" id="ficha-btn">Leer más</button>
            </div>
            <div class="secondary-grid">
                <div class="dashboard-card" id="perla-card"><h3 class="card-title">🧠 Perla del día</h3><p class="card-content" id="perla-text"></p></div>
                <div class="dashboard-card flashcard-container" id="flashcard-card">
                    <div class="flashcard-inner">
                        <div class="flashcard-front"><h3 class="card-title">🎴 Flashcard</h3><p class="card-content" id="flashcard-pregunta"></p><p class="flip-indicator">Toca para ver la respuesta</p></div>
                        <div class="flashcard-back"><h3 class="card-title">Respuesta</h3><p class="card-content" id="flashcard-respuesta"></p></div>
                    </div>
                </div>
                <div class="dashboard-card" id="pregunta-card"><h3 class="card-title">❓ Pregunta rápida</h3><p class="card-content" id="pregunta-text"></p><div class="options-container" id="pregunta-opciones"></div><p class="feedback" id="pregunta-feedback"></p></div>
                <div class="dashboard-card" id="lovable-card"><h3 class="card-title">💬 Lovable dice...</h3><p class="card-content" id="lovable-frase"></p></div>
            </div>
        </div>
    `;

    // --- 3. Core Functions ---

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const renderHomePage = () => {
        contentArea.innerHTML = homeHTML;

        // Populate content
        const perlaText = contentArea.querySelector('#perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        // Attach listeners to the newly created dashboard elements
        const flashcardCard = contentArea.querySelector('#flashcard-card');
        if (flashcardCard) {
            flashcardCard.addEventListener('click', () => {
                flashcardCard.classList.toggle('is-flipped');
            });
        }
        
        // (Add logic for other dashboard cards here as needed)
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
            console.error(`Failed to load section '${section}':`, error);
            renderErrorPage();
        }
    };

    // --- 4. Event Listeners & Initialization ---

    // Attach listeners to persistent elements
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.section);
        });
    });

    // Initial page load
    renderHomePage();
});
