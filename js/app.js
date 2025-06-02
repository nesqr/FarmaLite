document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const darkModeToggle = document.getElementById('darkModeToggle');
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const body = document.body;

  // Verificar existencia de elementos
  if (!darkModeToggle || !fontSizeSelect) {
    console.error('Elementos darkModeToggle o fontSizeSelect no encontrados');
    return;
  }

  // Cargar preferencias guardadas
  const loadPreferences = () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedDarkMode === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️ Modo Claro';
    }

    if (savedFontSize) {
      body.classList.remove('font-small', 'font-normal', 'font-large');
      body.classList.add(savedFontSize);
      fontSizeSelect.value = savedFontSize;
    }
  };

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    try {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
      localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    } catch (err) {
      console.error('Error al alternar modo oscuro:', err);
    }
  };

  // Cambiar tamaño de fuente
  const changeFontSize = () => {
    try {
      const selectedFontSize = fontSizeSelect.value;
      body.classList.remove('font-small', 'font-normal', 'font-large');
      body.classList.add(selectedFontSize);
      localStorage.setItem('fontSize', selectedFontSize);
    } catch (err) {
      console.error('Error al cambiar tamaño de fuente:', err);
    }
  };

  // Inicializar preferencias
  loadPreferences();

  // Asignar eventos
  darkModeToggle.addEventListener('click', toggleDarkMode);
  fontSizeSelect.addEventListener('change', changeFontSize);

  // Preparar para futuras funcionalidades (ej. notificaciones)
  const initFutureFeatures = () => {
    // Placeholder para notificaciones o ajustes adicionales
    console.log('FarmaLite: Inicializando futuras funcionalidades');
  };
  initFutureFeatures();
});