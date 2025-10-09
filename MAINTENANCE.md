# Manual de Mantenimiento Técnico

Este documento proporciona una descripción técnica del proyecto `TasaReal` (`nextn`), sus dependencias, estructura y cómo mantenerlo.

## 1. Descripción General

Este es un proyecto Next.js que muestra tasas de cambio de divisas en tiempo real. Utiliza Genkit para conectarse a la API de Google AI para funcionalidades avanzadas y `shadcn/ui` con Tailwind CSS para la interfaz de usuario.

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **UI:** React, shadcn/ui, Radix, Tailwind CSS
- **IA:** Genkit (Google AI)
- **Estilo de Código:** ESLint (configuración de Next.js), Prettier (implícito en la configuración estándar).

## 2. Estructura del Proyecto

A continuación se describe la estructura de directorios y archivos más importantes.

```
studio/
├── src/
│   ├── app/                # Rutas de la aplicación (App Router de Next.js)
│   │   ├── page.tsx        # Página principal
│   │   └── layout.tsx      # Layout principal de la aplicación
│   ├── components/         # Componentes de React
│   │   ├── ui/             # Componentes de shadcn/ui (botones, cards, etc.)
│   │   ├── exchange-rate-card.tsx # Tarjeta que muestra una tasa de cambio
│   │   └── currency-converter.tsx # Componente para convertir divisas
│   ├── lib/                # Librerías y utilidades
│   │   ├── actions.ts      # Server Actions (ej. getExchangeRates)
│   │   ├── icon-map.ts     # Mapeo de divisas a iconos de Font Awesome
│   │   └── types.ts        # Definiciones de tipos de TypeScript
│   └── ai/                 # Lógica relacionada con la IA (Genkit)
│       ├── genkit.ts       # Configuración del plugin de Google AI
│       └── flows/          # Flujos de Genkit
├── public/                 # Archivos estáticos (no presente, pero es estándar)
├── package.json            # Dependencias y scripts del proyecto
├── next.config.ts          # Configuración de Next.js
└── tailwind.config.ts      # Configuración de Tailwind CSS
```

## 3. Instalación y Ejecución

Para levantar el entorno de desarrollo local, sigue estos pasos:

1.  **Clonar el repositorio** (si aplica).
2.  **Navegar al directorio del proyecto:**
    ```bash
    cd studio
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```
4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## 4. Scripts Disponibles

Los siguientes scripts están definidos en `package.json` y se pueden ejecutar con `npm run <script>`:

-   `dev`: Inicia el servidor de desarrollo de Next.js con Turbopack.
-   `build`: Compila la aplicación para producción.
-   `start`: Inicia el servidor de producción de una aplicación ya compilada.
-   `lint`: Ejecuta ESLint para analizar el código en busca de errores y advertencias.
-   `typecheck`: Ejecuta el compilador de TypeScript para verificar los tipos en todo el proyecto.
-   `genkit:dev`: Inicia el servidor de desarrollo de Genkit.
-   `genkit:watch`: Inicia el servidor de desarrollo de Genkit en modo "watch".

## 5. Flujo de Datos y Lógica Principal

-   **Obtención de Tasas de Cambio:** La página principal (`src/app/page.tsx`), que es un Server Component, llama a la función `getExchangeRates()` desde `src/lib/actions.ts`.
-   **Renderizado de UI:** Los datos obtenidos se pasan como props a los componentes del lado del cliente (ej. `ExchangeRateCard`, `CurrencyConverter`) para ser renderizados.
-   **Lógica de IA:** La configuración de Genkit se encuentra en `src/ai/genkit.ts`. Los flujos de IA, que definen las interacciones con el modelo de lenguaje, están en `src/ai/flows/`.

## 6. Despliegue

El proyecto está configurado para un despliegue sencillo en plataformas como Vercel o Google App Hosting.

-   El archivo `apphosting.yaml` sugiere una configuración para Google App Hosting.
-   El archivo `vercel.json` y el componente `@vercel/analytics` sugieren una configuración para Vercel.

Para desplegar, simplemente conecta tu repositorio de Git a una de estas plataformas. Automáticamente detectarán que es un proyecto Next.js, ejecutarán `npm run build` y desplegarán la aplicación.

---
*Este manual fue generado y actualizado en la fecha 2025-10-09.*
