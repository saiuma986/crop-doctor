import { GoogleGenAI, Type } from "@google/genai";
import type { Diagnosis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    crop: {
      type: Type.STRING,
      description: 'The type of crop (e.g., Rice, Tomato, Potato). If not identifiable, state "Unknown Crop".'
    },
    issueName: {
      type: Type.STRING,
      description: 'The common name of the disease, pest, or deficiency. If the input is unclear, state that you need more details or a better image.'
    },
    cause: {
      type: Type.STRING,
      description: 'The likely cause (e.g., fungus, bacteria, specific pest, nutrient deficiency). If unclear, leave this field empty.'
    },
    organicTreatment: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of safe, organic treatment steps. Provide at least two actionable steps. If no issue is found, state "No treatment necessary".'
    },
    preventionTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of tips to prevent the issue in the future. If no issue is found, provide general plant health tips.'
    },
    expertHelp: {
      type: Type.STRING,
      description: 'Guidance on when to seek help from a professional agricultural expert. If no issue is found, state "Not applicable".'
    },
  },
  required: ['crop', 'issueName', 'cause', 'organicTreatment', 'preventionTips', 'expertHelp']
};

const systemInstruction = `You are CropDoctor, an AI Agricultural Disease Expert. Your sole purpose is to identify crop diseases, pest attacks, or nutrient deficiencies from images or text descriptions. You must only recommend safe, low-cost, organic treatments suitable for farmers. Do not suggest chemical-based solutions. Analyze the user's input and provide a diagnosis in the specified JSON format. If the input is unclear, politely state that you need more details or a better image in the 'issueName' field and leave other fields as empty or not applicable.`;

const model = 'gemini-2.5-flash';

const generateContent = async (parts: any[]) => {
  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: parts },
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: diagnosisSchema,
      temperature: 0.5,
    },
  });
  
  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as Diagnosis;
  } catch (e) {
    console.error("Failed to parse Gemini response:", jsonText);
    throw new Error("The AI returned an invalid response. Please try again.");
  }
};


export const analyzePlantIssueWithText = async (text: string): Promise<Diagnosis> => {
  const textPart = { text: `Analyze the following plant symptoms: "${text}"` };
  return generateContent([textPart]);
};

export const analyzePlantIssueWithImage = async (mimeType: string, base64Data: string): Promise<Diagnosis> => {
  const imagePart = {
    inlineData: {
      mimeType,
      data: base64Data,
    },
  };
  const textPart = { text: "Analyze the plant in this image for diseases, pests, or nutrient deficiencies." };
  return generateContent([imagePart, textPart]);
};