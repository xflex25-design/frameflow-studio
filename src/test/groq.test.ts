import { describe, expect, it } from "vitest";
import { generateGroqHaiku } from "@/lib/groq";

describe("Groq AI Generator Unit & Integration Tests", () => {
  it("should handle API errors gracefully when API key or model is invalid", async () => {
    await expect(generateGroqHaiku()).rejects.toThrow();
  });
});
