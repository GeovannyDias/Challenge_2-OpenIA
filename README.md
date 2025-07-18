# 🎭 Analizador de Sentimientos

Un analizador de sentimientos inteligente que utiliza modelos de IA para determinar si un mensaje expresa un sentimiento **positivo**, **negativo** o **neutral**.

## 🚀 ¿Qué hace este proyecto?

Este servicio analiza texto en español y determina la polaridad emocional del mensaje utilizando modelos de IA avanzados como GPT-4.1. Es perfecto para analizar comentarios, reviews, mensajes de redes sociales, o cualquier texto que quieras evaluar emocionalmente.

## 🛠️ Tecnologías utilizadas

- **Node.js v22** - Entorno de ejecución
- **JavaScript** - Lenguaje de programación
- **GitHub Models** - Servicio de IA principal
- **Azure OpenAI** - Servicio de IA alternativo
- **node-fetch** - Cliente HTTP para peticiones

## 📦 Dependencias

```json
{
  "@azure-rest/ai-inference": "^1.0.0-beta.6",
  "@azure/core-auth": "^1.10.0",
  "node-fetch": "^2.7.0"
}
```

## 📁 Estructura del proyecto

```
challenge_2/
├── index.js                    # Código principal del analizador
├── package.json               # Configuración del proyecto
├── README.md                  # Documentación (este archivo)
├── pruebas-sentimientos.md    # Lista de pruebas para el analizador
└── Challenge-Instructions.md   # Instrucciones del reto
```

## 🔧 Instalación y configuración

### 1. Prerrequisitos
- [Node.js v22](https://nodejs.org/en/download)
- Personal Access Token de GitHub Models (ver paso 2)

### 2. Obtener tu GitHub Models Token
1. Ve a [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Crea un **Classic Token** con scope `admin:public_key`
3. Copia el token (empieza con `ghp_`)

**📋 Enlaces útiles:**
- **GitHub Models Marketplace**: https://github.com/marketplace/models
- **GitHub Personal Access Tokens**: https://github.com/settings/tokens
- **Documentación GitHub Models**: https://docs.github.com/en/rest/models

### 3. Instalar el proyecto
```bash
# Clonar o descargar el proyecto
cd challenge_2
o
cd Challenge_2-OpenIA

# Instalar dependencias
npm install
```

## 🎯 Cómo ejecutar el proyecto

### Formato básico:
```bash
npm start -- <TU_TOKEN> "<mensaje a analizar>"
```

### Ejemplos prácticos:

#### ✅ Sentimiento positivo:
```bash
npm start -- ghp_tu_token_aqui "Estoy muy feliz con este resultado"
# Salida: Sentimiento detectado:positivo
```

#### ❌ Sentimiento negativo:
```bash
npm start -- ghp_tu_token_aqui "Odio los lunes"
# Salida: Sentimiento detectado:negativo
```

#### ⚖️ Sentimiento neutral:
```bash
npm start -- ghp_tu_token_aqui "Hoy es martes"
# Salida: Sentimiento detectado:neutral
```

#### 🚫 Mensaje vacío:
```bash
npm start -- ghp_tu_token_aqui "   "
# Salida: Error: No se ha detectado un mensaje para procesar
```

## 🔑 Configuración de API Keys

### GitHub Models (Principal)
1. Reemplaza `ghp_tu_token_aqui` con tu token real
2. El token debe tener el formato: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Azure OpenAI (Opcional)
Si tienes acceso a Azure OpenAI, puedes usar:
```bash
npm start -- <API_KEY> "<mensaje>" <endpoint.azure.com>
```

**📋 Enlaces útiles para Azure OpenAI:**
- **Azure Portal**: https://portal.azure.com
- **Azure OpenAI Service**: https://azure.microsoft.com/en-us/products/ai-services/openai-service
- **Documentación Azure OpenAI**: https://learn.microsoft.com/en-us/azure/ai-services/openai/

## 📊 Resultados esperados

| Tipo | Salida |
|------|---------|
| **Positivo** | `Sentimiento detectado:positivo` |
| **Negativo** | `Sentimiento detectado:negativo` |
| **Neutral** | `Sentimiento detectado:neutral` |
| **Error token** | `Error: No es posible consumir los servicios con el KEY suministrado` |
| **Mensaje vacío** | `Error: No se ha detectado un mensaje para procesar` |

## 🎨 Modelos disponibles

El proyecto usa **GPT-4.1** por defecto, pero puedes cambiar el modelo en `index.js` línea 67:

```javascript
model: "gpt-4.1" // Cambiar por: gpt-4o, gpt-4o-mini, gpt-4, claude-3-5-sonnet, etc.
```

## 🔍 Pruebas incluidas

El archivo `pruebas-sentimientos.md` contiene más de 100 ejemplos de prueba organizados por categorías:
- Sentimientos positivos
- Sentimientos negativos  
- Sentimientos neutrales
- Casos ambiguos
- Sentimientos mixtos

## 🌐 Recursos adicionales

**🔗 Enlaces importantes:**
- **GitHub Models Marketplace**: https://github.com/marketplace/models
- **GitHub Personal Access Tokens**: https://github.com/settings/tokens
- **Azure OpenAI Service**: https://azure.microsoft.com/en-us/products/ai-services/openai-service
- **Node.js Official**: https://nodejs.org/en/download
- **SDK Azure AI Inference**: https://www.npmjs.com/package/@azure-rest/ai-inference

## ⚠️ Consideraciones importantes

1. **Token de seguridad**: Nunca compartas tu token públicamente
2. **Conexión a internet**: Requiere conexión para acceder a los modelos
3. **Límites de uso**: GitHub Models tiene límites de uso gratuitos
4. **Idioma**: Optimizado para español, pero funciona en otros idiomas

## 🐛 Solución de problemas

### Error: "No es posible consumir los servicios"
- Verifica que tu token sea válido
- Asegúrate de tener conexión a internet
- Revisa que el token tenga los permisos correctos

### Error: "No se ha detectado un mensaje"
- Asegúrate de que el mensaje no esté vacío
- Usa comillas para mensajes con espacios

### Token inválido
- Verifica que el token empiece con `ghp_`
- Regenera el token si es necesario

## 📞 Soporte

Si encuentras algún problema:
1. Revisa que Node.js v22 esté instalado
2. Verifica que las dependencias estén instaladas (`npm install`)
3. Confirma que tu token sea válido
4. Consulta el archivo `pruebas-sentimientos.md` para ejemplos

---

**¡Listo para analizar sentimientos!** 🎉 

Empieza con un mensaje simple y descubre qué tan preciso es el análisis de IA.
