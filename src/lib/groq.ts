import OpenAI from "openai";

// Initialize OpenAI client configured for Groq API
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateGroqHaiku(): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Write a haiku about speed." }],
    });
    return completion.choices[0]?.message?.content ?? "";
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Groq API Error:", err);
    throw new Error(err.message || "Failed to generate response from Groq");
  }
}
