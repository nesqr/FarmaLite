// data/home.js
// Contiene todos los datos para las tarjetas dinámicas de la pantalla de inicio.

// Para la tarjeta "Perla del Día"
export const perlas = [
    "La rifampicina tiñe los fluidos corporales de naranja. No te asustes, no te estás oxidando.",
    "Los IECA producen tos seca porque aumentan los niveles de bradicinina. Simple, pero molesto.",
    "Nunca des un AINE a un paciente con insuficiencia cardíaca. Es como echarle leña al fuego.",
    "El antídoto del paracetamol, la N-acetilcisteína, actúa reponiendo los niveles de glutatión hepático."
];

// Para la funcionalidad futura de "Ficha Destacada"
export const fichasDestacadas = [
    {
        titulo: "Betabloqueadores",
        resumen: "Fármacos terminados en '-olol' que antagonizan los receptores beta-adrenérgicos. Clave en cardiología, pero cuidado con los pacientes asmáticos.",
        seccion: "cardiovascular"
    },
    {
        titulo: "Benzodiacepinas",
        resumen: "Potencian el efecto del neurotransmisor GABA, produciendo sedación, hipnosis, y ansiólisis. Su antídoto es el flumazenilo.",
        seccion: "sistemaNervioso"
    }
];

// Para la tarjeta "Modo examen en 3 minutos"
export const repasosExamen = [
    {
        titulo: "5 Puntos Clave de los Antibióticos",
        seccion: "antimicrobianos" // ID de la sección a la que enlaza
    },
    {
        titulo: "Diferencias Esenciales entre IECA y ARA-II",
        seccion: "cardiovascular"
    },
    {
        titulo: "Manejo del Dolor: La Escalera de la OMS",
        seccion: "dolor"
    }
];

// Para la tarjeta "Trivia exprés diaria"
export const triviasExpres = [
    {
        tema: "Betabloqueadores",
        pregunta_ejemplo: "¿Cuál de estos NO es un betabloqueador cardioselectivo?"
    },
    {
        tema: "AINES",
        pregunta_ejemplo: "¿Cuál es el principal riesgo de la combinación de AINES y IECAS?"
    },
    {
        tema: "Anticoagulantes",
        pregunta_ejemplo: "¿Qué vía de administración se usa para la heparina no fraccionada?"
    }
];
