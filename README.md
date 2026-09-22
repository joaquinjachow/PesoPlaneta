# Peso Planetario

Calculadora web para descubrir cuánto pesarías en los distintos cuerpos del sistema solar según su gravedad.

[Abrir la aplicación](https://peso-planeta.vercel.app/)

## Qué podés hacer

- Ingresar un peso en kilogramos o libras.
- Comparar el resultado en Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno, Plutón, la Luna y el Sol.
- Ordenar y filtrar los cuerpos que querés ver.
- Consultar el gráfico comparativo y referencias con objetos cotidianos.
- Compartir los resultados mediante el menú del dispositivo o copiarlos al portapapeles.
- Consultar los últimos cálculos guardados localmente en el dispositivo.
- Usar tema claro u oscuro e instalar la aplicación como PWA cuando el navegador lo permita.

## Tecnología

- Next.js 15 con App Router y React 19.
- TypeScript y Tailwind CSS 4.
- Recharts para las visualizaciones.
- next-themes para el tema claro y oscuro.
- Vercel Analytics para analítica anónima.

## Estructura

```text
app/         Página principal, metadata y rutas de error
components/  Interfaz, gráfico, filtros, historial y PWA
hooks/       Estado y comportamiento del calculador
lib/         Cálculos, constantes, tipos y persistencia local
public/      Iconos, manifiesto y service worker
```

Los cálculos y las conversiones se concentran en `lib/planetary-calculations.ts`. El historial se guarda solo en el navegador mediante `localStorage`.

## Desarrollo

Se requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Comandos disponibles:

```bash
npm run dev       # Entorno de desarrollo
npm run typecheck # Verificación de TypeScript
npm run build     # Build de producción
npm run start     # Servir la build generada
```

## PWA

La aplicación incluye `manifest.json` y un service worker. Después de modificar recursos estáticos o la lógica de caché, se debe actualizar la versión de caché definida en `public/sw.js` para que los dispositivos reciban los cambios.

## Licencia

Todos los derechos reservados.