# 🚀 Calculadora de Peso Planetario

<div align="center">

![Calculadora de Peso Planetario](https://img.shields.io/badge/Calculadora-Peso%20Planetario-blue?style=for-the-badge&logo=rocket)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

*Descubre cuánto pesarías en diferentes planetas del sistema solar*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visitar-green?style=for-the-badge&logo=vercel)](https://peso-planeta.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repositorio-black?style=for-the-badge&logo=github)](https://github.com/joaquinjachow)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Contacto-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/joaquin-jachow/)

</div>

---

## 🌟 Características

### ✨ **Funcionalidades Principales**
- 🪐 **11 Planetas y Cuerpos Celestes**: Desde Mercurio hasta el Sol
- ⚖️ **Doble Unidad**: Kilogramos y libras
- 📊 **Gráficos Interactivos**: Visualización con Recharts y tooltips con valor exacto y comparación con objetos cotidianos
- 🎨 **Tema Claro/Oscuro**: Modo oscuro con estrellas blancas en el fondo; modo claro con fondo limpio
- 🔍 **Filtros Inteligentes**: Selecciona qué planetas mostrar (con aviso si todos están desactivados)
- 📐 **Ordenar Resultados**: Por peso o por nombre, ascendente o descendente (flecha para invertir)
- 📈 **Comparaciones Educativas**: Equivalencias con objetos cotidianos en tarjetas y en el tooltip del gráfico; se muestran en la unidad elegida (kg o lbs)

### 🚀 **Características Avanzadas**
- 📱 **Responsive Design**: Perfecto en móviles y desktop
- 📱 **PWA (Progressive Web App)**: Instalable como app con `manifest.json` y service worker; notificación cuando la app es instalable y aviso si falla el registro offline
- ⚡ **Lazy Loading**: Carga optimizada del gráfico (Suspense + skeleton)
- 💾 **Historial de Cálculos**: Últimos 10 cálculos con identificador único por entrada
- 🎯 **Validación Inteligente**: Límites de peso realistas (0–1000 kg / 0–2204.62 lbs)
- 🌌 **Animaciones Espaciales**: Estrellas en modo oscuro (memorizadas con `useMemo`)
- 🔎 **SEO**: Metadata, Open Graph, robots y JSON-LD (Schema.org WebApplication)
- ⌨️ **Accesibilidad**: Enter para calcular; scroll suave a resultados tras calcular (sin contorno de foco invasivo)

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14** - Framework React con App Router
- **TypeScript 5** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Estilos utilitarios y diseño responsive
- **shadcn/ui** - Componentes de UI modernos y accesibles

### **Visualización de Datos**
- **Recharts** - Gráficos interactivos y responsivos
- **Lucide React** - Iconos modernos y consistentes

### **Funcionalidades**
- **next-themes** - Gestión de temas claro/oscuro (toggle no clickeable hasta montar para evitar flash)
- **date-fns** - Fechas relativas en el historial (locale español)
- **Sonner** - Toasts para PWA instalable y errores del service worker

---

## 🚀 Instalación y Uso

### **Prerrequisitos**
```bash
Node.js 18+ 
npm, yarn, o pnpm
```

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/joaquinjachow/peso-app.git

# Navegar al directorio
cd peso-app

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Ejecutar en modo desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev
```

### **Construcción para Producción**
```bash
npm run build
npm start
```

---

## 📱 Capturas de Pantalla

<div align="center">

### 🌙 Modo Oscuro

|  |  |
|:---:|:---:|
| ![Modo oscuro 1](public/Screens%20proyecto%20(1).png) | ![Modo oscuro 2](public/Screens%20proyecto%20(2).png) |
| ![Modo oscuro 3](public/Screens%20proyecto%20(3).png) | ![Modo oscuro 4](public/Screens%20proyecto%20(4).png) |

### ☀️ Modo Claro

|  |  |
|:---:|:---:|
| ![Modo claro 5](public/Screens%20proyecto%20(5).png) | ![Modo claro 6](public/Screens%20proyecto%20(6).png) |

</div>

---

## 🎯 Características Técnicas

### **Arquitectura**
- **Componentes Modulares**: Código reutilizable y mantenible
- **Hooks Personalizados**: Lógica de negocio centralizada
- **Tipos TypeScript**: Interfaces bien definidas
- **Lazy Loading**: Optimización de rendimiento

### **Datos Científicos**
- **Gravedad Planetaria**: Valores precisos de la NASA
- **Conversiones Exactas**: Factores de conversión precisos
- **Validación Rigurosa**: Límites de peso realistas (0-1000 kg)

### **Experiencia de Usuario**
- **Animaciones Suaves**: Transiciones fluidas; scroll suave a la sección de resultados tras calcular
- **Feedback Visual**: Skeleton del gráfico, validación, aviso si no hay planetas activos en filtros
- **Tooltips en el Gráfico**: Valor exacto, gravedad y comparación con objeto cotidiano (en kg o lbs según unidad)
- **Accesibilidad**: Tecla Enter para calcular; scroll a resultados sin contorno de foco en bloque

### **SEO y PWA**
- **Metadata**: Título, descripción, keywords, Open Graph, canonical e icono (`/icon.svg`)
- **JSON-LD**: Structured data tipo WebApplication para buscadores
- **PWA**: `manifest.json` (icono SVG, colores, `display: standalone`) y service worker (`public/sw.js`). Toasts informativos cuando la app es instalable o si falla el SW

---

## 🌌 Planetas Incluidos

| Planeta | Gravedad | Emoji | Descripción |
|---------|----------|-------|-------------|
| Mercurio | 0.378x | ☿️ | El planeta más cercano al Sol |
| Venus | 0.907x | ♀️ | El planeta más caliente |
| **Tierra** | **1.0x** | 🌍 | **Nuestro hogar** |
| Marte | 0.377x | ♂️ | El planeta rojo |
| Júpiter | 2.36x | ♃ | El gigante gaseoso |
| Saturno | 0.916x | ♄ | El planeta de los anillos |
| Urano | 0.889x | ♅ | El planeta inclinado |
| Neptuno | 1.13x | ♆ | El planeta más ventoso |
| Plutón | 0.071x | ♇ | Planeta enano helado |
| Luna | 0.166x | 🌙 | Nuestro satélite natural |
| Sol | 27.01x | ☀️ | Nuestra estrella |

---

## 🎨 Personalización

### **Temas Disponibles**
- 🌙 **Modo Oscuro**: Tema espacial con estrellas blancas parpadeantes en el fondo
- ☀️ **Modo Claro**: Fondo limpio, sin estrellas
- 🔄 **Sistema**: El selector de tema respeta la preferencia del dispositivo una vez montado

### **Orden y Filtros**
- 📐 **Ordenar**: Por peso o por nombre; botón con flecha (↑/↓) para alternar ascendente/descendente
- ✅ **Filtros de planetas**: Selecciona qué planetas mostrar; si todos están desactivados, se muestra el mensaje "Activa al menos un planeta"
- 📊 Gráficos y tarjetas que se actualizan en tiempo real según orden y filtros

---

## 📊 Comparaciones Educativas

La aplicación incluye comparaciones inteligentes con objetos cotidianos:

- 🐘 **Elefante africano** (6,000 kg)
- 🚗 **Coche promedio** (1,500 kg)  
- 🦛 **Hipopótamo** (2,500 kg)
- 🦏 **Rinoceronte** (2,300 kg)
- 🚛 **Camión pequeño** (3,500 kg)
- 🐴 **Caballo** (500 kg)
- 🐄 **Vaca** (650 kg)
- 🐻‍❄️ **Oso polar** (450 kg)
- 🦁 **León** (190 kg)
- 🐅 **Tigre** (220 kg)
- 🦒 **Jirafa** (1,200 kg)
- 🐊 **Cocodrilo** (400 kg)

---

## 📲 Instalación como PWA

La app es instalable como aplicación en el dispositivo. Si el navegador lo permite, verás un aviso (toast) indicando que puedes instalarla.

- **Chrome / Edge (escritorio)**: Menú (⋮) → "Instalar Peso Planetario..." o icono de instalación en la barra de direcciones.
- **Android**: En el navegador, menú → "Añadir a la pantalla de inicio" o "Instalar aplicación".
- **iOS/Safari**: Compartir → "Añadir a la pantalla de inicio".

Requisito: la app debe servirse por **HTTPS** (o `localhost` en desarrollo).

---

## 👨‍💻 Desarrollador

<div align="center">

### Joaquín Jachow
*Desarrollador Full Stack & Entusiasta del Espacio*

[![GitHub](https://img.shields.io/badge/GitHub-@joaquinjachow-black?style=for-the-badge&logo=github)](https://github.com/joaquinjachow)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-@joaquinjachow-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/joaquin-jachow/)
[![Repositorio](https://img.shields.io/badge/Portfolio-Website-purple?style=for-the-badge&logo=globe)](https://github.com/joaquinjachow/PesoPlaneta)

*"Explorando el universo, una línea de código a la vez"* 🚀

</div>

---

## 🌟 Agradecimientos

- 🌌 **NASA** - Por los datos científicos precisos
- 🎨 **shadcn/ui** - Por los componentes de UI increíbles
- ⚡ **Vercel** - Por la plataforma de despliegue
- 🎯 **Next.js Team** - Por el framework excepcional

---

<div align="center">

**⭐ Si te gusta este proyecto, ¡dale una estrella! ⭐**

*Hecho con ❤️ y mucho ☕ en el espacio*

</div>