# Reto 2: Analizador de Sentimientos

## Descripción

Crea una aplicación en Node.js que actúe como un "robot analizador de sentimientos". La app debe recibir frases y, usando el modelo GPT-4.1 a través de la API de GitHub Models (usando el SDK oficial @azure-rest/ai-inference y el endpoint https://models.github.ai/inference) o Azure OpenAI (vía REST), determinar si la frase expresa un sentimiento positivo, negativo o neutral.

La aplicación acepta argumentos por línea de comandos y funciona en ambos modos:
- **GitHub Models:** usando un Personal Access Token (PAT) clásico con el scope `admin:public_key` y el SDK oficial `@azure-rest/ai-inference`.
- **Azure OpenAI:** usando el API key y endpoint de Azure OpenAI vía REST (solo si ya tienes acceso, no es necesario crear un recurso ni ingresar tarjetas de crédito).

> **Importante:**
El programa acepta los parámetros necesarios para funcionar tanto con Azure OpenAI como con GitHub Models. Sin embargo, para las pruebas de los equipos, únicamente se utilizará GitHub Models.

## Prerequisitos
- [Node.js v22](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Sistema operativo: Windows, macOS o Linux.
- Dependencias instaladas:
  ```sh
  npm install @azure-rest/ai-inference @azure/core-auth node-fetch
  ```
- Un **PAT clásico** de GitHub con scope `admin:public_key` (para GitHub Models) o un **API key** de Azure OpenAI (si ya cuentas con uno).

## Estructura del Proyecto
```
challenge_2/
├── index.js
├── package.json
└── ...
```

## Uso

Ejecuta el script con:

### GitHub Models
```sh
npm start -- ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx "<mensaje>"
```
- `<PAT>`: Personal Access Token de GitHub Models.
- `<mensaje>`: El mensaje a analizar.

### Azure OpenAI
```sh
npm start -- <API_KEY> "<mensaje>" <endpoint>
```
- `<API_KEY>`: Tu clave de Azure OpenAI.
- `<mensaje>`: El mensaje a analizar.
- `<endpoint>`: Endpoint de Azure OpenAI (debe contener `.azure.com`).

## Salidas esperadas

- Si el mensaje es detectado como **positivo**:
  ```
  Sentimiento detectado:positivo
  ```
- Si el mensaje es detectado como **negativo**:
  ```
  Sentimiento detectado:negativo
  ```
- Si el mensaje es detectado como **neutral**:
  ```
  Sentimiento detectado:neutral
  ```
- Si la respuesta no es reconocida:
  ```
  Respuesta: <contenido devuelto>
  ```

## Manejo de errores

- Si el mensaje está vacío o solo contiene espacios:
  ```
  Error: No se ha detectado un mensaje para procesar
  ```
- Si ocurre un error al consumir el servicio (por ejemplo, API key inválida, endpoint incorrecto, etc.):
  ```
  Error: No es posible consumir los servicios con el KEY suministrado
  ```
- Si los argumentos no coinciden con los formatos esperados, el script termina silenciosamente (sin mostrar mensajes de error adicionales).

## Ejemplos

```sh
npm start -- <API_KEY> "Hoy es un gran día" <endpoint>
# Salida esperada: Sentimiento detectado:positivo

npm start -- <PAT> "Esto es terrible"
# Salida esperada: Sentimiento detectado:negativo

npm start -- <API_KEY> "    " <endpoint>
# Salida esperada: Error: No se ha detectado un mensaje para procesar

npm start -- <API_KEY> "Mensaje" <endpoint_incorrecto>
# Salida esperada: Error: No es posible consumir los servicios con el KEY suministrado
```

## Observaciones
- El script detecta automáticamente el modo de uso según los argumentos.
- El resultado será uno de: `Sentimiento detectado:positivo`, `Sentimiento detectado:negativo` o `Sentimiento detectado:neutral`.
- Si el modelo responde con otra cosa, se mostrará el texto completo.

## Recursos útiles
- [GitHub Models Marketplace](https://github.com/marketplace/models)
- [Documentación Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [SDK Azure AI Inference](https://www.npmjs.com/package/@azure-rest/ai-inference)
