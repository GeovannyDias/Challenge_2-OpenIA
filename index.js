// Analizador de Sentimientos - Reto 2
// Uso: npm start -- <PAT|API_KEY> "<mensaje>" [endpoint]

// Configuración para manejar certificados SSL en entornos de desarrollo
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false
});

// Importación de las dependencias necesarias
const fetch = require('node-fetch'); // Para hacer peticiones HTTP a GitHub Models y Azure OpenAI

// Obtenemos los argumentos de línea de comandos (excluyendo 'node' e 'index.js')
const args = process.argv.slice(2);

/**
 * Función para terminar el programa silenciosamente (sin mostrar errores)
 * Se usa cuando los argumentos no coinciden con los formatos esperados
 */
function exitSilent() {
  process.exit(0);
}

/**
 * Función para mostrar un mensaje de error y terminar el programa
 * @param {string} msg - El mensaje de error a mostrar
 */
function printError(msg) {
  console.log(msg);
  process.exit(0);
}

/**
 * Función para validar si el mensaje está vacío o solo contiene espacios
 * @param {string} msg - El mensaje a validar
 * @returns {boolean} - True si el mensaje está vacío, false en caso contrario
 */
function isEmptyMessage(msg) {
  return !msg || msg.trim().length === 0;
}

/**
 * Función para analizar sentimientos usando GitHub Models
 * @param {string} pat - Personal Access Token de GitHub
 * @param {string} message - El mensaje a analizar
 */
async function analyzeWithGitHubModels(pat, message) {
  try {
    // Configuración del endpoint de GitHub Models
    const endpoint = 'https://models.github.ai/inference';
    
    // Creamos el prompt específico para análisis de sentimientos
    const prompt = `Analiza el siguiente mensaje y responde solo con "positivo", "negativo" o "neutral": ${message}`;
    
    // Configuramos la petición HTTP directa
    const response = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pat}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "Eres un analizador de sentimientos. Responde solo con 'positivo', 'negativo' o 'neutral'." },
          { role: "user", content: prompt }
        ],
        model: "gpt-4.1", // Modelos disponibles: gpt-4.1, gpt-4o, gpt-4o-mini, gpt-4, gpt-3.5-turbo, claude-3-5-sonnet, llama-3.1-405b, llama-3.1-70b, mistral-large, phi-3-medium
        temperature: 0,
        max_tokens: 10
      }),
      agent: agent // Usar el agente HTTPS configurado
    });
    
    // Verificamos si la respuesta fue exitosa
    if (response.ok) {
      const result = await response.json();
      const text = result.choices?.[0]?.message?.content?.trim().toLowerCase();
      
      // Verificamos si la respuesta es válida (positivo, negativo o neutral)
      if (text === 'positivo' || text === 'negativo' || text === 'neutral') {
        console.log(`Sentimiento detectado:${text}`);
      } else {
        // Si la respuesta no es reconocida, mostramos el contenido completo
        console.log(`Respuesta: ${text}`);
      }
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (e) {
    // Si hay cualquier error (PAT inválido, problemas de conectividad, etc.)
    printError('Error: No es posible consumir los servicios con el KEY suministrado');
  }
}

/**
 * Función para analizar sentimientos usando Azure OpenAI
 * @param {string} apiKey - La clave API de Azure OpenAI
 * @param {string} message - El mensaje a analizar
 * @param {string} endpoint - El endpoint de Azure OpenAI
 */
async function analyzeWithAzureOpenAI(apiKey, message, endpoint) {
  try {
    // Construimos la URL completa para la API de Azure OpenAI
    const url = `${endpoint}/openai/deployments/gpt-4-1/completions?api-version=2023-07-01-preview`;
    
    // Creamos el prompt específico para análisis de sentimientos
    const prompt = `Analiza el siguiente mensaje y responde solo con "positivo", "negativo" o "neutral": ${message}`;
    
    // Configuramos el cuerpo de la petición
    const body = {
      prompt,
      max_tokens: 10,    // Limitamos la respuesta a 10 tokens máximo
      temperature: 0     // Temperatura 0 para respuestas más deterministas
    };
    
    // Realizamos la petición HTTP POST a Azure OpenAI
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey  // Autenticación con la clave API
      },
      body: JSON.stringify(body),
      agent: agent // Usar el agente HTTPS configurado
    });
    
    // Parseamos la respuesta JSON
    const data = await res.json();
    
    // Extraemos y procesamos la respuesta
    const text = data.choices?.[0]?.text?.trim().toLowerCase();
    
    // Verificamos si la respuesta es válida (positivo, negativo o neutral)
    if (text === 'positivo' || text === 'negativo' || text === 'neutral') {
      console.log(`Sentimiento detectado:${text}`);
    } else {
      // Si la respuesta no es reconocida, mostramos el contenido completo
      console.log(`Respuesta: ${text}`);
    }
  } catch (e) {
    // Si hay cualquier error (API key inválida, endpoint incorrecto, etc.)
    printError('Error: No es posible consumir los servicios con el KEY suministrado');
  }
}

/**
 * Función principal del programa
 * Analiza los argumentos de línea de comandos y decide qué función usar
 */
async function main() {
  // Caso 1: GitHub Models (2 argumentos, el primero empieza con 'ghp_')
  if (args.length === 2 && args[0].startsWith('ghp_')) {
    const [pat, message] = args;
    
    // Validamos que el mensaje no esté vacío
    if (isEmptyMessage(message)) {
      printError('Error: No se ha detectado un mensaje para procesar');
    }
    
    // Llamamos a la función para GitHub Models
    await analyzeWithGitHubModels(pat, message);
    
  // Caso 2: Azure OpenAI (3 argumentos, el tercero contiene '.azure.com')
  } else if (args.length === 3 && args[2].includes('.azure.com')) {
    const [apiKey, message, endpoint] = args;
    
    // Validamos que el mensaje no esté vacío
    if (isEmptyMessage(message)) {
      printError('Error: No se ha detectado un mensaje para procesar');
    }
    
    // Llamamos a la función para Azure OpenAI
    await analyzeWithAzureOpenAI(apiKey, message, endpoint);
    
  // Caso 3: Argumentos no válidos - terminamos silenciosamente
  } else {
    exitSilent();
  }
}

// Ejecutamos la función principal
main();
