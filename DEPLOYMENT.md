# 🚀 Deployment & CI/CD Setup

Este proyecto incluye pipelines automatizados de CI/CD usando GitHub Actions.

## 📋 Configuración Requerida

### 1. Secrets de GitHub (Repository Settings > Secrets and variables > Actions)

Para que el deployment automático funcione, necesitas configurar estos secrets:

#### Para Vercel:
```
VERCEL_TOKEN=tu_token_de_vercel
ORG_ID=tu_organization_id
PROJECT_ID=tu_project_id
```

#### Para obtener estos valores:
1. **VERCEL_TOKEN**: Ve a [Vercel > Settings > Tokens](https://vercel.com/account/tokens) y crea un nuevo token
2. **ORG_ID**: Ejecuta `vercel env ls` en tu proyecto local
3. **PROJECT_ID**: Ejecuta `vercel env ls` en tu proyecto local

### 2. Configuración del Entorno de Production

En GitHub, ve a Settings > Environments y crea un entorno llamado `production` con las reglas de protección que desees.

## 🔄 Workflows Incluidos

### 1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
Se ejecuta en push a `main` y `develop`, y en PRs a `main`:

- ✅ **Lint & Audit**: ESLint y auditoría de seguridad
- ✅ **Type Check**: Verificación de tipos TypeScript
- 🏗️ **Build & Test**: Compilación de la aplicación
- 🚀 **Deploy**: Deployment automático a Vercel (solo en `main`)
- 📢 **Notify**: Notificaciones de resultado

### 2. **PR Validation** (`.github/workflows/pr-validation.yml`)
Se ejecuta en PRs para validación rápida:

- 🔍 **Quick Validation**: Lint solo en archivos cambiados
- 📦 **Bundle Analysis**: Análisis del tamaño del bundle
- 💬 **PR Comment**: Comentario automático con resultados

## 🏗️ Scripts de Build Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con Turbopack

# Genkit AI
npm run genkit:dev       # Iniciar Genkit en modo desarrollo
npm run genkit:watch     # Genkit con watch mode

# Build y Deploy
npm run build           # Build de producción
npm run start          # Servidor de producción
npm run lint           # ESLint
npm run typecheck      # Verificación de tipos TypeScript
```

## 🌍 Estrategia de Branches

- **`main`**: Rama de producción - deployments automáticos
- **`develop`**: Rama de desarrollo - solo CI sin deploy
- **Feature branches**: Crear PRs hacia `develop` o `main`

## 🔧 Variables de Entorno

Asegúrate de configurar estas variables en tu plataforma de deployment:

```bash
NODE_ENV=production
# Agrega aquí otras variables específicas de tu aplicación
```

## 📝 Notas Importantes

1. **Node.js Version**: El pipeline usa Node.js 18. Asegúrate de que sea compatible con tu aplicación.

2. **Cache**: Los workflows usan cache de npm para optimizar tiempos de build.

3. **Security**: Nunca commits secrets o tokens al repositorio. Usa siempre GitHub Secrets.

4. **Genkit AI**: Este proyecto incluye Google Genkit para funcionalidades de AI. Asegúrate de configurar las API keys necesarias.

## 🎯 Próximos Pasos

1. Configura los secrets en GitHub
2. Haz push del código al repositorio
3. Los workflows se ejecutarán automáticamente
4. ¡Tu aplicación estará deployed! 🎉

## 🔍 Troubleshooting

Si algún workflow falla:

1. Revisa los logs en la pestaña "Actions" de GitHub
2. Verifica que todos los secrets estén configurados correctamente
3. Asegúrate de que las dependencias estén actualizadas
4. Revisa que no haya errores de lint o TypeScript

---

**¿Necesitas ayuda?** Abre un issue en el repositorio con los detalles del problema.