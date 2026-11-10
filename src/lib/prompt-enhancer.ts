import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env["GEMINI_API_KEY"] || "",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

export const enhancePrompt = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ prompt: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) {
      return { enhancedPrompt: data.prompt };
    }
    try {
      const call = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Enhance the following user prompt for a cinematic AI video generation engine.
Add detailed descriptors for:
- Cinematic lighting
- Dynamic camera angles
- Immersive atmosphere and environmental details
- High-fidelity textures and mood

User prompt: "${data.prompt}"
Enhanced prompt (return ONLY the enhanced prompt string, no conversational filler):`,
      });
      const timeout = new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 2500),
      );
      const res: any = await Promise.race([call, timeout]);
      return { enhancedPrompt: res.text?.trim() || data.prompt };
    } catch {
      return { enhancedPrompt: data.prompt };
    }
  });
