const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { description } = JSON.parse(event.body);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As a senior front-end developer, your task is to translate the following user description into clean, modern HTML and CSS code.
      User description: "${description}"

      Your response MUST be a valid JSON object with two keys: "html" and "css".
      Example: { "html": "<button class='my-btn'>Click</button>", "css": ".my-btn { color: red; }" }
      Do not add any other text or explanation outside of the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: jsonText,
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to generate code." }) };
  }
};