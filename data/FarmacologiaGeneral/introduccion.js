// data/FarmacologiaGeneral/introduccion.js

export const introduccion = {
  titulo: "Introducción a la Farmacología",
  teoria: `
    <h2>Conceptos Fundamentales</h2>
    <p>La farmacología es la ciencia biológica que estudia las acciones y propiedades de las drogas o fármacos en los organismos vivos. Para entenderla, debemos manejar varios conceptos clave:</p>
    <ul>
      <li><strong>Fármaco o Droga:</strong> Es toda sustancia usada para el tratamiento, prevención, curación o diagnóstico de una enfermedad. También se considera fármaco al principio activo del medicamento.</li>
      <li><strong>Medicamento:</strong> Es la sustancia medicinal y sus combinaciones destinadas al uso en humanos o animales.</li>
      <li><strong>Especialidad farmacéutica:</strong> Es el medicamento ya preparado para su uso inmediato, acondicionado para ser entregado al paciente, tal como se obtiene en la farmacia.</li>
    </ul>
    <h2>Clasificación de los Fármacos según su Origen</h2>
    <p>Los fármacos se pueden clasificar según de dónde provienen:</p>
    <ul>
      <li><strong>Naturales:</strong> De origen Animal (insulina), Vegetal (tilo) o Mineral (Ca, Na).</li>
      <li><strong>Semisintéticos:</strong> Obtenidos de un compuesto natural que luego es modificado en un laboratorio.</li>
      <li><strong>Sintéticos:</strong> Creados completamente en un laboratorio.</li>
    </ul>
    <h2>Ramas de la Farmacología</h2>
    <ul>
      <li><strong>Farmacognosia:</strong> Estudia el origen y características de las drogas en su estado natural.</li>
      <li><strong>Farmacodinamia:</strong> Estudia cómo actúan los fármacos en el cuerpo.</li>
      <li><strong>Farmacocinética:</strong> Estudia el viaje del fármaco por el organismo (ADME).</li>
      <li><strong>Toxicología:</strong> Estudia los efectos tóxicos de las sustancias.</li>
      <li><strong>Posología:</strong> Estudia las dosis de los medicamentos.</li>
      <li><strong>Farmacovigilancia:</strong> Identifica y valora los riesgos del uso de un medicamento.</li>
    </ul>
  `,
  flashcards: [
    { pregunta: "¿Qué es la farmacología?", respuesta: "La ciencia que estudia las acciones y propiedades de los fármacos en los organismos vivos." },
    { pregunta: "¿Qué es la Farmacocinética?", respuesta: "El estudio de la absorción, distribución, metabolismo y excreción de las drogas (ADME)." },
    { pregunta: "¿Qué es la Farmacodinamia?", respuesta: "El estudio de cómo actúan los fármacos sobre los seres vivos y su mecanismo de acción." }
  ],
  test: [
    {
      pregunta: "La rama que estudia lo que el cuerpo le hace al fármaco (ADME) es la:",
      opciones: ["Farmacodinamia", "Farmacognosia", "Farmacocinética"],
      correcta: 2,
      explicacion: "La farmacocinética estudia el viaje del fármaco por el cuerpo (Absorción, Distribución, Metabolismo y Excreción)."
    }
  ]
};
