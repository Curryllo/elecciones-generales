export interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    date: "6 oct",
    title: "La convocatoria sale en el BOE",
    description:
      "El Real Decreto 806/2026 disuelve el Congreso y el Senado y fija la votación para el domingo 29 de noviembre.",
  },
  {
    date: "19 nov",
    title: "Último día para el voto por correo",
    description:
      "Hay que solicitar el certificado de inscripción en el censo antes del décimo día previo a la votación.",
  },
  {
    date: "13 a 27 nov",
    title: "Campaña electoral",
    description:
      "Quince días de mitines, carteles y propaganda. Empieza a las 00:00 del día 13 y termina a las 24:00 del día 27.",
  },
  {
    date: "24 nov",
    title: "Se prohíben los sondeos",
    description:
      "Los cinco días previos a la votación no se pueden publicar encuestas de intención de voto por ningún medio.",
  },
  {
    date: "28 nov",
    title: "Jornada de reflexión",
    description:
      "La campaña ya terminó. El día anterior a la votación queda reservado para pensarlo sin actos electorales.",
  },
  {
    date: "29 nov",
    title: "Día de votación",
    description:
      "Los colegios electorales abren a las 9:00 y cierran a las 20:00, sin interrupción, en todo el país.",
  },
  {
    date: "23 dic",
    title: "Constitución de las Cámaras",
    description:
      "Los diputados y senadores electos se reúnen en sesión constitutiva a las 10:00 de la mañana.",
  },
];
