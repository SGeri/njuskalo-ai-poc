import { CarDealershipAi } from "@/components/car-dealership-ai";
import { generateFiltersFromPrompt } from "@/lib/openai";

export default function Home() {
  async function handleAIRequest(userInput: string) {
    "use server";

    return await generateFiltersFromPrompt(userInput);
  }

  return <CarDealershipAi onAIRequest={handleAIRequest} />;
}
