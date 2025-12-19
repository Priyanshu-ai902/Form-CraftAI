"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const PROMPT =
  ", on the basis of the description, please generate a JSON object for a form. The JSON object should have the following properties: 'formTitle' (string), 'formHeading' (string), and 'formFields' (array of objects). Each object in the 'formFields' array should represent a form field and must include the following properties: 'fieldName' (string), 'placeholder' (string), 'fieldLabel' (string), 'fieldType' (string, e.g., 'text', 'select', 'radio', 'checkbox'), and 'isRequired' (boolean)." +
  "\n\nIMPORTANT:\n- For field types 'select', 'radio', and 'checkbox', you MUST include an 'options' property, which is an array of strings." +
  "\n- For all other field types (like 'text', 'email', 'number', etc.), you MUST include an 'options' property with an empty array, for example: \"options\": []." +
  "\n- The entire output must be a single, valid JSON object. Do not include any text or markdown before or after the JSON.";

function cleanAndParseJson(text) {
  // Remove markdown code blocks
  const cleanedText = text.replace(/```json\n/g, '').replace(/```/g, '');

  try {
    // First attempt to parse
    return JSON.parse(cleanedText);
  } catch (error) {
    console.warn("Initial JSON parsing failed. Attempting to fix trailing commas.", error);
    
    // Attempt to fix trailing commas
    const fixedText = cleanedText.replace(/,(?=\s*?[}\]])/g, '');
    
    try {
      // Second attempt to parse
      return JSON.parse(fixedText);
    } catch (finalError) {
      console.error("Failed to parse JSON even after cleaning:", finalError);
      throw new Error("Failed to generate valid JSON for the form.");
    }
  }
}

export async function generateFormSchema(userInput) {
  const chat = model.startChat({
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
    },
    history: [],
  });

  const result = await chat.sendMessage(
    "Description: " + userInput + PROMPT
  );

  const rawText = result.response.text();
  const parsedJson = cleanAndParseJson(rawText);
  return JSON.stringify(parsedJson);
}
