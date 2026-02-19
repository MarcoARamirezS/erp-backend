# Creación del Proyecto

**Sigue los siguientes pasos:**

1) Crear proyecto Nuxt 3 (forzado) + Node 24 enforcement
1.1 Comandos

```
# 1) Crear carpeta (tu estructura obligatoria)
mkdir erp-frontend
cd erp-frontend

# 2) Forzar Nuxt 3 (no Nuxt 4)
npx nuxi@3.21.0 init .

# 3) Instalar deps base
npm install
```

1.2 Crear .nvmrc

Archivo: erp-frontend/.nvmrc

```
24
```

2) Instalar TailwindCSS v3 + DaisyUI v4 + Pinia

Tailwind v3 instalación y config base (docs v3).

2.1 Comandos
```
# TailwindCSS v3 + PostCSS
npm i -D tailwindcss@^3 postcss autoprefixer

# DaisyUI v4 (NO v5)
npm i -D daisyui@^4

# Pinia para Nuxt
npm i @pinia/nuxt
```

3) Estructura enterprise (carpetas obligatorias)

Ejecuta:
```
mkdir -p assets/css \
components/ui components/layout components/users components/roles components/permissions components/suppliers components/products \
composables middleware pages/users pages/roles pages/permissions pages/suppliers pages/products \
plugins stores types utils layouts
```

4) package.json (Node >=24 + preinstall que falla)

Reemplaza tu erp-frontend/package.json completo por esto:

Archivo: erp-frontend/package.json
```
{
  "name": "erp-frontend",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=24"
  },
  "scripts": {
    "preinstall": "node -e \"const [major]=process.versions.node.split('.').map(Number); if(major<24){console.error('\\n🚫 Node 24+ requerido. Tu versión: '+process.versions.node+'\\n'); process.exit(1)}\"",
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "lint": "echo \"(Opcional) agrega ESLint después\""
  },
  "dependencies": {
    "@pinia/nuxt": "^0.11.3",
    "nuxt": "3.21.0",
    "pinia": "^3.0.0",
    "vue": "^3.0.0",
    "vue-router": "^4.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "daisyui": "^4.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0"
  }
}
```

5) Tailwind + DaisyUI + tema ERP + dark mode
5.1 CSS principal de Tailwind

Archivo: erp-frontend/assets/css/tailwind.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5.2 Config Tailwind (v3) + DaisyUI v4 + tema

Archivo: erp-frontend/tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
      animation: {
        fadeIn: 'fadeIn .18s ease-out',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'erpDark',
    themes: [
      {
        erpLight: {
          'primary': '#2563EB',
          'secondary': '#0EA5E9',
          'accent': '#22C55E',
          'neutral': '#111827',
          'base-100': '#FFFFFF',
          'base-200': '#F3F4F6',
          'base-300': '#E5E7EB',
          'info': '#0EA5E9',
          'success': '#22C55E',
          'warning': '#F59E0B',
          'error': '#EF4444',
        },
      },
      {
        erpDark: {
          'primary': '#60A5FA',
          'secondary': '#38BDF8',
          'accent': '#34D399',
          'neutral': '#E5E7EB',
          'base-100': '#0B1220',
          'base-200': '#0F172A',
          'base-300': '#1F2937',
          'info': '#38BDF8',
          'success': '#34D399',
          'warning': '#FBBF24',
          'error': '#F87171',
        },
      },
    ],
  },
}
```

6) nuxt.config.ts (runtimeConfig + pinia + css + compat)

Archivo: erp-frontend/nuxt.config.ts
```
export default defineNuxtConfig({
  ssr: true,

  css: ['@/assets/css/tailwind.css'],

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    // Privado (solo server)
    apiSecret: process.env.API_SECRET || '',

    // Público (client + server)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000/api',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'ERP Enterprise',
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  app: {
    head: {
      title: 'ERP Enterprise',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
})
```

7) .env (solo nombres)

Archivo: erp-frontend/.env.example
```
NUXT_PUBLIC_API_BASE=
NUXT_PUBLIC_APP_NAME=
API_SECRET=
```
