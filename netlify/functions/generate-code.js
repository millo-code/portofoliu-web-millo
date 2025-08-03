const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
  // LOG 1: Verificăm dacă funcția pornește
  console.log("Function handler started.");

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // LOG 2: Verificăm dacă cheia API există
    if (!apiKey) {
      console.error("EROARE: Cheia GEMINI_API_KEY nu a fost găsită!");
      throw new Error("API key is not configured.");
    }
    console.log("Pasul 1: Cheia API a fost găsită.");

    const { description } = JSON.parse(event.body);
    // LOG 3: Verificăm descrierea primită
    console.log("Pasul 2: Am primit descrierea:", description);

    const genAI = new GoogleGenerativeAI(apiKey);
    // ============== MODIFICAREA ESTE AICI ==============
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    // ===================================================
    
    const prompt = `
      As a senior front-end developer, your task is to translate the following user description into clean, modern HTML and CSS code.
      User description: "${description}"
      Your response MUST be a valid JSON object with two keys: "html" and "css".
      Do not add any other text or explanation outside of the JSON object.
    `;

    console.log("Pasul 3: Trimit cererea către Google AI...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // LOG 4: Afișăm răspunsul complet de la Google
    console.log("Pasul 4: Am primit răspuns de la Google:", JSON.stringify(response, null, 2));

    const jsonText = response.text();
    // LOG 5: Afișăm textul extras
    console.log("Pasul 5: Am extras textul din răspuns:", jsonText);
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: jsonText,
    };

  } catch (error) {
    // LOG 6: Prindem orice eroare critică
    console.error("!!! EROARE CRITICĂ în blocul catch:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};