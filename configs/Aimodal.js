"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const PROMPT =
  ", on the basis of description please give formFields in Json format with formTitle, formHeading, formSubheading with form having form field, form name, placeholder name, fieldLabel, fieldtype, field required in Json format";

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

  return result.response.text();
}
