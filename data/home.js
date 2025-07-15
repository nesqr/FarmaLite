// data/home.js
// Contains all the dynamic data needed to populate the new dashboard on the home screen.

// Data for the "Pearl of the Day" card
export const perlas = [
    "La rifampicina tiñe los fluidos corporales de naranja. No te asustes, no te estás oxidando.",
    "Los IECA producen tos seca porque aumentan los niveles de bradicinina. Simple, pero molesto.",
    "Nunca des un AINE a un paciente con insuficiencia cardíaca. Es como echarle leña al fuego.",
    "El antídoto del paracetamol, la N-acetilcisteína, actúa reponiendo los niveles de glutatión hepático."
];

// Data for the "Featured Card"
export const fichasDestacadas = [
    {
        titulo: "Betabloqueadores",
        resumen: "Fármacos terminados en '-olol' que antagonizan los receptores beta-adrenérgicos. Clave en cardiología, pero cuidado con los pacientes asmáticos.",
        seccion: "cardiovascular" // Used by the "Read more" button
    },
    {
        titulo: "Benzodiacepinas",
        resumen: "Potencian el efecto del neurotransmisor GABA, produciendo sedación, hipnosis, y ansiólisis. Su antídoto es el flumazenilo.",
        seccion: "sistemaNervioso"
    }
];

// Data for the "3-minute review" card.
export const repasosExamen = [
    {
        titulo: "5 Puntos Clave de los Antibióticos",
        seccion: "antimicrobianos" // ID of the section it links to
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

// Data for the "Express Trivia" card
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
