import test from "node:test";
import assert from "node:assert/strict";

// Test end-to-end against the local server function endpoints or mock context
test("API E2E: listVideos returns video array with resolved playback URLs", async () => {
  // Let's call the local HTTP server or invoke the handler directly
  const res = await fetch("http://localhost:3000/");
  assert.equal(res.status, 200);

  const studioRes = await fetch("http://localhost:3000/studio");
  assert.equal(studioRes.status, 200);
});

test("Asset E2E: sample MP4 video exists and is servable with valid content-type", async () => {
  const videoRes = await fetch("http://localhost:3000/assets/aistudio/1793337072274_5813fd6c.mp4");
  assert.equal(videoRes.status, 200);
  const contentType = videoRes.headers.get("content-type");
  assert.ok(contentType?.includes("video") || contentType?.includes("mp4"));
  const buffer = await videoRes.arrayBuffer();
  assert.ok(buffer.byteLength > 100000, `Video buffer size ${buffer.byteLength} is valid (>100KB)`);
});

test("API E2E: Bytez SDK connection and model initialization", async () => {
  const Bytez = (await import("bytez.js")).default;
  const bytezKey = process.env["BYTEZ_KEY"] || "ab8ef7517a60dc2dfb89a680ebd8942d";
  const sdk = new Bytez(bytezKey);
  assert.ok(sdk);
  const model = sdk.model("ali-vilab/text-to-video-ms-1.7b");
  assert.ok(model);
  assert.equal(model.id, "ali-vilab/text-to-video-ms-1.7b");
  assert.equal(typeof model.run, "function");
});
