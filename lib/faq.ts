export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "¿Quién puede votar el 29 de noviembre?",
    answer:
      "Los españoles mayores de 18 años que figuren inscritos en el censo electoral y no estén privados del derecho de sufragio. Es el artículo 2 de la Ley Orgánica del Régimen Electoral General.",
  },
  {
    question: "¿Qué necesito llevar al colegio electoral?",
    answer:
      "El DNI, el pasaporte o el carné de conducir con fotografía. El presidente de la mesa comprueba tu identidad y tu inscripción en las listas del censo y con eso ya puedes votar.",
  },
  {
    question: "¿Cómo se reparten los 350 escaños?",
    answer:
      "Cada provincia reparte sus escaños por separado con el método divisor: los votos se dividen entre 1, 2, 3 y así sucesivamente hasta cubrir la circunscripción.",
  },
  {
    question: "¿Puedo votar por correo?",
    answer:
      "Sí. Hay que pedir el certificado de inscripción en cualquier oficina de Correos hasta el 19 de noviembre, el décimo día antes de la votación, y entregarlo relleno en la oficina correspondiente.",
  },
  {
    question: "¿Qué ocurre el 28 de noviembre?",
    answer:
      "Es la jornada de reflexión. La campaña termina a medianoche del día 27 y durante todo el 28 no se pueden celebrar actos electorales. Tampoco se publican sondeos desde el día 24.",
  },
  {
    question: "¿Este sitio es oficial?",
    answer:
      "No. Recopilamos información de fuentes abiertas: el BOE y la Junta Electoral Central para las fechas y las reglas, la prensa de referencia para la actualidad y los canales de los partidos para sus mensajes. No tenemos relación con la administración electoral ni con ningún partido.",
  },
];
