// ui.js – versión 4.1.0 (con saludos dinámicos)

import { perlas } from './data/home.js';
import { frasesLovable } from './data/lovable.js';
import { saludos } from './data/saludos.js'; // <-- NUEVO: Importamos los saludos

document.addEventListener('DOMContentLoaded', () => {

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
    const lovableBtn = document.getElementById('lovable-btn');
    const lovableTooltip = document.getElementById('lovable-tooltip');

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
            <div class="dashboard-card" id="lovable-home-card">
                <h3 class="card-title">🤖 Lovable dice...</h3>
                <p class="card-content" id="lovable-home-frase"></p>
            </div>
        </div>`;

    const toggleMenu = () => {
        sideMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        body.classList.toggle('menu-open');
    };

    const applyTheme = (theme) => {
        html.classList.remove('light', 'dark');
        html.classList.add(theme);
        localStorage.setItem('temaFarmaLite', theme);
    };

    const applyFontSize = (sizeClass) => {
        html.classList.remove('font-small', 'font-medium', 'font-large');
        html.classList.add(sizeClass);
        localStorage.setItem('tamanoLetra', sizeClass);
    };

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // <-- NUEVO: Función para obtener el saludo correcto según la hora
    const obtenerSaludoDelDia = () => {
        const hora = new Date().getHours();
        if (hora >= 5 && hora < 12) {
            return getRandomItem(saludos.mañana);
        } else if (hora >= 12 && hora < 20) {
            return getRandomItem(saludos.tarde);
        } else {
            return getRandomItem(saludos.noche);
        }
    };

    const renderHomePage = () => {
        contentArea.innerHTML = homeHTML;
        initNombre();
        populateDashboard();
    };

    const renderTopicPage = (data) => {
        contentArea.innerHTML = `
            <div class="topic-page">
                <h1>${data.titulo}</h1>
                <article class="topic-theory">${data.teoria}</article>
                <div class="topic-actions">
                    ${data.flashcards?.length ? `
                        <div class="action-card">
                            <h3>🎴 Flashcards</h3>
                            <p>${data.flashcards.length} tarjetas.</p>
                            <button class="btn">Practicar</button>
                        </div>` : ''}
                    ${data.test?.length ? `
                        <div class="action-card">
                            <h3>❓ Test</h3>
                            <p>${data.test.length} preguntas.</p>
                            <button class="btn">Evaluar</button>
                        </div>` : ''}
                </div>
            </div>`;
    };

    const renderErrorPage = () => {
        contentArea.innerHTML = `
            <div class="topic-page">
                <h1>🚧 En Construcción</h1>
                <p>El contenido para esta sección estará disponible pronto.</p>
            </div>`;
    };

    const navigateTo = async (section) => {
        if (sideMenu.classList.contains('is-open')) toggleMenu();
        if (section === 'home') return renderHomePage();

        localStorage.setItem('ultimaSeccionVisitada', section);

        const generalSections = [
            "introduccion", "bases-cientificas", "vias-administracion", "procesos-farmacos",
            "neurotransmision-snc", "teoria-receptores", "mediadores-quimicos", "reacciones-adversas",
            "farmacovigilancia", "prescripcion-racional"
        ];
        const clinicalSections = [
            "antimicrobianos", "cardiovascular", "aines-y-dolor"
        ];

        let path = "";

        if (generalSections.includes(section)) {
            path = `./data/FarmacologiaGeneral/${section}.js`;
        } else if (clinicalSections.includes(section)) {
            path = `./data/FarmacologiaClinica/${section}.js`;
        } else {
            path = `./data/${section}.js`;
        }

        try {
            const module = await import(path);
            renderTopicPage(module[section]);
        } catch (error) {
            console.error(`Error cargando la sección '${section}':`, error);
            renderErrorPage();
        }
    };

    const cambiarNombre = () => {
        const nuevoNombre = prompt('Para una mejor experiencia, dinos tu nombre:');
        if (nuevoNombre && nuevoNombre.trim() !== '') {
            localStorage.setItem('nombreUsuario', nuevoNombre.trim());
            actualizarSaludo(nuevoNombre.trim());
        }
    };
    
    // <-- MODIFICADO: Ahora el saludo es dinámico
    const actualizarSaludo = (nombre) => {
        const saludoElement = document.getElementById('saludo-usuario');
        const saludoDelDia = obtenerSaludoDelDia();
        if (saludoElement) {
            saludoElement.innerHTML = `${saludoDelDia}<br><span class="user-name">¿Listo, ${nombre}?</span>`;
        }
    };

    // <-- MODIFICADO: Se ajusta el saludo inicial
    const initNombre = () => {
        const nombreGuardado = localStorage.getItem('nombreUsuario');
        const saludoElement = document.getElementById('saludo-usuario');
        if (nombreGuardado) {
            actualizarSaludo(nombreGuardado);
        } else {
            if (saludoElement) {
                 saludoElement.textContent = obtenerSaludoDelDia();
            }
            setTimeout(cambiarNombre, 1500);
        }
    };

    const populateDashboard = () => {
        const perlaText = document.getElementById('perla-text');
        if (perlaText) perlaText.textContent = getRandomItem(perlas);

        const lovableFrase = document.getElementById('lovable-home-frase');
        if (lovableFrase) lovableFrase.textContent = getRandomItem(frasesLovable);

        const ultimaSeccion = localStorage.getItem('ultimaSeccionVisitada');
        const card = document.getElementById('ultima-visita-card');
        if (ultimaSeccion && card) {
            const btn = document.getElementById('continuar-btn');
            const nombreBonito = ultimaSeccion.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            btn.textContent = `Continuar en: ${nombreBonito}`;
            btn.onclick = () => navigateTo(ultimaSeccion);
            card.style.display = 'flex';
        }
    };

    // ... (El resto del código de los EVENT LISTENERS no necesita cambios)
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            const action = item.dataset.action;
            if (section) navigateTo(section);
            else if (action === "cambiar-nombre") {
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
    themeToggle.addEventListener('click', () => {
        const current = html.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(current);
    });
    fontSizeToggle.addEventListener('click', () => {
        const sizes = ['font-small', 'font-medium', 'font-large'];
        const current = sizes.find(size => html.classList.contains(size)) || 'font-medium';
        const next = sizes[(sizes.indexOf(current) + 1) % sizes.length];
        applyFontSize(next);
    });
    lovableBtn.addEventListener('click', () => {
        const frase = getRandomItem(frasesLovable);
        lovableTooltip.textContent = frase;
        lovableTooltip.classList.add('show');
        setTimeout(() => lovableTooltip.classList.remove('show'), 4000);
    });
    const savedTheme = localStorage.getItem('temaFarmaLite') || 'light';
    const savedFontSize = localStorage.getItem('tamanoLetra') || 'font-medium';
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    renderHomePage();
});

