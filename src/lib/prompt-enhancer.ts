import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

export const enhancePrompt = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ prompt: z.string() }).parse(d))
  .handler(async ({ data }) => {
    try {
      const res = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: `Enhance the following user prompt for a cinematic AI video generation engine.
Add detailed descriptors for:
- Cinematic lighting
- Dynamic camera angles (e.g., tracking, crane, close-up)
- Immersive atmosphere and environmental details
- High-fidelity textures and mood

User prompt: "${data.prompt}"
Enhanced prompt (return ONLY the enhanced prompt string, no conversational filler):`,
      });
      return { enhancedPrompt: res.text?.trim() || data.prompt };
    } catch (e) {
      console.error("Prompt enhancement error:", e);
      return { enhancedPrompt: data.prompt };
    }
  });
