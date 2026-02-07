import { Planet } from './types';

export const PLANETS: Planet[] = [
  { 
    name: "Mercurio", 
    gravity: 0.378, 
    color: "bg-orange-500", 
    emoji: "☿️",
    description: "El planeta más cercano al Sol"
  },
  { 
    name: "Venus", 
    gravity: 0.907, 
    color: "bg-yellow-500", 
    emoji: "♀️",
    description: "El planeta más caliente del sistema solar"
  },
  { 
    name: "Tierra", 
    gravity: 1.0, 
    color: "bg-blue-500", 
    emoji: "🌍",
    description: "Nuestro hogar en el universo"
  },
  { 
    name: "Marte", 
    gravity: 0.377, 
    color: "bg-red-500", 
    emoji: "♂️",
    description: "El planeta rojo"
  },
  { 
    name: "Júpiter", 
    gravity: 2.36, 
    color: "bg-orange-600", 
    emoji: "♃",
    description: "El gigante gaseoso"
  },
  { 
    name: "Saturno", 
    gravity: 0.916, 
    color: "bg-yellow-600", 
    emoji: "♄",
    description: "El planeta de los anillos"
  },
  { 
    name: "Urano", 
    gravity: 0.889, 
    color: "bg-cyan-500", 
    emoji: "♅",
    description: "El planeta inclinado"
  },
  { 
    name: "Neptuno", 
    gravity: 1.13, 
    color: "bg-blue-600", 
    emoji: "♆",
    description: "El planeta más ventoso"
  },
  { 
    name: "Plutón", 
    gravity: 0.071, 
    color: "bg-gray-500", 
    emoji: "♇",
    description: "Planeta enano helado"
  },
  { 
    name: "Luna", 
    gravity: 0.166, 
    color: "bg-gray-300", 
    emoji: "🌙",
    description: "Nuestro satélite natural"
  },
  { 
    name: "Sol", 
    gravity: 27.01, 
    color: "bg-yellow-400", 
    emoji: "☀️",
    description: "Nuestra estrella"
  },
];

export const WEIGHT_LIMITS = {
  MIN_KG: 0,
  MAX_KG: 1000,
  MIN_LBS: 0,
  MAX_LBS: 2204.62,
} as const;

export const CONVERSION_FACTORS = {
  KG_TO_LBS: 2.20462,
  LBS_TO_KG: 0.453592,
} as const;

export const EVERYDAY_OBJECTS = [
  { name: "Elefante africano", weight: 6000, emoji: "🐘", description: "El mamífero terrestre más grande" },
  { name: "Coche promedio", weight: 1500, emoji: "🚗", description: "Un automóvil típico" },
  { name: "Hipopótamo", weight: 2500, emoji: "🦛", description: "Uno de los animales más pesados" },
  { name: "Rinoceronte", weight: 2300, emoji: "🦏", description: "Mamífero de gran tamaño" },
  { name: "Camión pequeño", weight: 3500, emoji: "🚛", description: "Vehículo de carga ligero" },
  { name: "Caballo", weight: 500, emoji: "🐴", description: "Animal doméstico grande" },
  { name: "Vaca", weight: 650, emoji: "🐄", description: "Animal de granja" },
  { name: "Oso polar", weight: 450, emoji: "🐻‍❄️", description: "El carnívoro terrestre más grande" },
  { name: "León", weight: 190, emoji: "🦁", description: "El rey de la selva" },
  { name: "Tigre", weight: 220, emoji: "🐅", description: "El felino más grande" },
  { name: "Jirafa", weight: 1200, emoji: "🦒", description: "El animal terrestre más alto" },
  { name: "Cocodrilo", weight: 400, emoji: "🐊", description: "Reptil de gran tamaño" },
] as const;