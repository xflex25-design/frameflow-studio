import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// 1. Schema Validation Unit Tests
const createSchema = z.object({
  prompt: z.string().trim().min(3).max(2000),
  style: z.enum(["realistic", "animated"]),
  aspectRatio: z.enum(["16:9", "9:16"]),
  image: z
    .object({
      data: z.string().max(10_000_000),
      mimeType: z.enum(["image/png", "image/jpeg", "image/webp"]),
    })
    .nullable(),
});

test("schema accepts valid text-to-video input", () => {
  const input = {
    prompt: "A beautiful African savannah with golden acacia trees at sunset",
    style: "realistic",
    aspectRatio: "16:9",
    image: null,
  };
  const parsed = createSchema.parse(input);
  assert.equal(parsed.prompt, input.prompt);
  assert.equal(parsed.style, "realistic");
  assert.equal(parsed.aspectRatio, "16:9");
});

test("schema accepts valid 9:16 portrait format", () => {
  const input = {
    prompt: "Dancing warriors in traditional Zambian attire",
    style: "animated",
    aspectRatio: "9:16",
    image: null,
  };
  const parsed = createSchema.parse(input);
  assert.equal(parsed.aspectRatio, "9:16");
  assert.equal(parsed.style, "animated");
});

test("schema rejects prompt shorter than 3 characters", () => {
  assert.throws(() => {
    createSchema.parse({
      prompt: "hi",
      style: "realistic",
      aspectRatio: "16:9",
      image: null,
    });
  });
});

test("schema rejects invalid aspect ratio", () => {
  assert.throws(() => {
    createSchema.parse({
      prompt: "Valid prompt",
      style: "realistic",
      aspectRatio: "4:3",
      image: null,
    });
  });
});

test("schema validates image mime types", () => {
  const valid = {
    prompt: "Animate this photo",
    style: "realistic",
    aspectRatio: "16:9",
    image: {
      data: "base64sampledata",
      mimeType: "image/png",
    },
  };
  assert.doesNotThrow(() => createSchema.parse(valid));

  const invalid = {
    prompt: "Animate this photo",
    style: "realistic",
    aspectRatio: "16:9",
    image: {
      data: "base64sampledata",
      mimeType: "image/gif", // Not supported
    },
  };
  assert.throws(() => createSchema.parse(invalid));
});

// 2. Video URL & Fallback Resolution Logic Unit Tests
function resolveVideoUrl(v: { url?: string | null; storage_path?: string | null }): string {
  if (v.url && v.url.trim().length > 0) return v.url;
  if (v.storage_path) {
    if (v.storage_path.startsWith("http://") || v.storage_path.startsWith("https://") || v.storage_path.startsWith("/")) {
      return v.storage_path;
    }
  }
  return "/assets/aistudio/1793337072274_5813fd6c.mp4";
}

test("resolveVideoUrl preserves existing direct url", () => {
  const direct = "https://cdn.example.com/video123.mp4";
  assert.equal(resolveVideoUrl({ url: direct }), direct);
});

test("resolveVideoUrl maps http storage_path correctly", () => {
  const storageUrl = "https://storage.example.com/user/video.mp4";
  assert.equal(resolveVideoUrl({ storage_path: storageUrl }), storageUrl);
});

test("resolveVideoUrl falls back to verified local MP4 asset when empty", () => {
  assert.equal(resolveVideoUrl({}), "/assets/aistudio/1793337072274_5813fd6c.mp4");
  assert.equal(resolveVideoUrl({ url: null, storage_path: null }), "/assets/aistudio/1793337072274_5813fd6c.mp4");
});

// 3. Stage & Progress State Machine Unit Tests
interface VideoState {
  status: "queued" | "in_progress" | "completed" | "failed";
  stage: string;
  progress: number;
}

function advancePipelineStage(current: VideoState, nextStage: "enhance" | "render" | "encode" | "complete" | "fail", error?: string): VideoState {
  switch (nextStage) {
    case "enhance":
      return { status: "in_progress", stage: "Enhancing prompt with AI…", progress: 25 };
    case "render":
      return { status: "in_progress", stage: "Rendering 5-second video frames…", progress: 60 };
    case "encode":
      return { status: "in_progress", stage: "Encoding MP4 & applying audio…", progress: 85 };
    case "complete":
      return { status: "completed", stage: "Ready!", progress: 100 };
    case "fail":
      return { status: "failed", stage: error || "Generation failed", progress: 0 };
  }
}

test("pipeline progresses through all stages monotonically", () => {
  let state: VideoState = { status: "queued", stage: "Queued", progress: 0 };

  state = advancePipelineStage(state, "enhance");
  assert.equal(state.status, "in_progress");
  assert.equal(state.progress, 25);
  assert.ok(state.stage.includes("Enhancing"));

  state = advancePipelineStage(state, "render");
  assert.equal(state.progress, 60);
  assert.ok(state.stage.includes("Rendering"));

  state = advancePipelineStage(state, "encode");
  assert.equal(state.progress, 85);
  assert.ok(state.stage.includes("Encoding"));

  state = advancePipelineStage(state, "complete");
  assert.equal(state.status, "completed");
  assert.equal(state.progress, 100);
  assert.equal(state.stage, "Ready!");
});

// 4. Download Filename Sanitizer Unit Tests
function sanitizeDownloadFilename(prompt: string, videoId: string): string {
  const cleanPrompt = prompt.slice(0, 24).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase().replace(/-+/g, "-").replace(/^-|-$/g, "");
  return `ogra-ai-${cleanPrompt || "video"}-${videoId.slice(0, 6)}.mp4`;
}

test("sanitizeDownloadFilename generates safe, descriptive filenames", () => {
  const fn1 = sanitizeDownloadFilename("A majestic lion on Pride Rock!!", "123e4567-e89b-12d3-a456-426614174000");
  assert.equal(fn1, "ogra-ai-a-majestic-lion-on-pride-123e45.mp4");

  const fn2 = sanitizeDownloadFilename("!@#$%^&*()", "abcdef123");
  assert.equal(fn2, "ogra-ai-video-abcdef.mp4");
});
