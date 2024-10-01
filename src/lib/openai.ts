import { AiResponse } from "@/types";
import OpenAI from "openai";
import { GENERATE_FILTER_SYSTEM_PROMPT } from "./prompts";
import { aiResponseSchema } from "./schemas";

export const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const MODEL = "gpt-4o-mini";

export const generateFiltersFromPrompt = async (userInput: string) => {
  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: GENERATE_FILTER_SYSTEM_PROMPT },
      { role: "user", content: userInput },
    ],
    response_format: {
      type: "json_object",
    },
    stream: false,
  });

  console.log(
    "Completion",
    [
      { role: "system", content: GENERATE_FILTER_SYSTEM_PROMPT },
      { role: "user", content: userInput },
    ],
    completion.choices[0].message.content
  );

  try {
    const jsonStringResult = completion.choices[0].message.content;
    if (!jsonStringResult) throw new Error("No result from AI provider");

    const jsonResult = JSON.parse(jsonStringResult);
    const { explanation, ...carFilters } = aiResponseSchema
      .partial()
      .parse(jsonResult) as AiResponse;

    return {
      explanation,
      filters: carFilters,
    };
  } catch (error) {
    console.error("AI Parsing Error", error);
    return {
      explanation: "We are unable to generate filters from your input.",
      filters: {},
    };
  }
};
