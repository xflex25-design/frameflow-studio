import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Sparkles, ImagePlus, Type, X, Loader2, Trash2, Download, Film } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GenerationStatus } from "@/components/GenerationStatus";
import { VideoPlayer } from "@/components/VideoPlayer";
import { createVideo, checkVideo, listVideos, deleteVideo } from "@/lib/video.functions";
import hero from "@/assets/hero-scene.jpg";
import animated from "@/assets/animated-thumb.jpg";

export const Route = createFileRoute("/_authenticated/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Ogra AI" },
      { name: "description", content: "Generate 5-second AI videos from text or images." },
      { property: "og:title", content: "Studio — Ogra AI" },
      { property: "og:description", content: "Your AI video studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Studio,
});

type Img = { data: string; mimeType: "image/png" | "image/jpeg" | "image/webp"; preview: string };

function Studio() {
  const qc = useQueryClient();
  const list = useServerFn(listVideos);
  const create = useServerFn(createVideo);
  const check = useServerFn(checkVideo);
  const remove = useServerFn(deleteVideo);

  const [mode, setMode] = useState<"text" | "image">("text");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<"realistic" | "animated">("realistic");
  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [image, setImage] = useState<Img | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const videos = useQuery({ queryKey: ["videos"], queryFn: () => list() });
  const pending = (videos.data ?? []).filter(
    (v) => v.status === "queued" || v.status === "in_progress",
  );

  // Poll pending jobs every 8s
  useEffect(() => {
    if (!pending.length) return;
    const t = setInterval(async () => {
      let changed = false;
      for (const v of pending) {
        try {
          const r = await check({ data: { id: v.id } });
          if (r.status === "completed" || r.status === "failed") {
            changed = true;
            if (r.status === "failed") toast.error(r.error ?? "Video failed");
            else toast.success("Your video is ready!");
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (changed) qc.invalidateQueries({ queryKey: ["videos"] });
    }, 8000);
    return () => clearInterval(t);
  }, [pending.map((p) => p.id).join(","), check, qc]);

  function onFile(f: File | undefined): void {
    if (!f) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(f.type)) {
      toast.error("Use a PNG, JPG or WebP image.");
      return;
    }
    if (f.size > 6 * 1024 * 1024) {
      toast.error("Image must be under 6 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setImage({
        data: url.split(",")[1] ?? "",
        mimeType: f.type as Img["mimeType"],
        preview: url,
      });
    };
    reader.readAsDataURL(f);
  }

  async function generate(): Promise<void> {
    if (prompt.trim().length < 3) {
      toast.error("Describe your scene first.");
      return;
    }
    if (mode === "image" && !image) {
      toast.error("Upload an image to animate.");
      return;
    }
    setSubmitting(true);
    try {
      await create({
        data: {
          prompt,
          style,
          aspectRatio: aspect,
          image: mode === "image" && image ? { data: image.data, mimeType: image.mimeType } : null,
        },
      });
      toast.success("Generating your 5-second video… this takes 1–3 minutes.");
      qc.invalidateQueries({ queryKey: ["videos"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start generation");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Create a <span className="text-primary">5-second</span> movie.
        </h1>
        <p className="mt-2 text-lg text-sky">Describe a scene, or bring a photo to life.</p>

        <section className="mt-8 rounded-[2rem] border-2 border-primary p-4 shadow-frame md:p-6">
          <div className="grid gap-4 rounded-2xl border border-border bg-card/60 p-4 md:grid-cols-[1fr_200px]">
            <div className="space-y-4">
              <div className="inline-flex rounded-full bg-secondary p-1">
                {(["text", "image"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {m === "text" ? (
                      <Type className="h-4 w-4" />
                    ) : (
                      <ImagePlus className="h-4 w-4" />
                    )}
                    {m === "text" ? "Text to Video" : "Image to Video"}
                  </button>
                ))}
              </div>

              {mode === "image" && (
                <div>
                  {image ? (
                    <div className="relative inline-block">
                      <img
                        src={image.preview}
                        alt="Upload"
                        className="h-40 rounded-xl object-cover"
                      />
                      <button
                        onClick={() => setImage(null)}
                        className="absolute right-2 top-2 rounded-full bg-background/90 p-1"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-foreground"
                    >
                      <ImagePlus className="h-8 w-8" /> Upload a starting image
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    hidden
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                </div>
              )}

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                maxLength={2000}
                placeholder={
                  mode === "image"
                    ? "How should it move? e.g. She turns to the camera and smiles as the sun sets…"
                    : "A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…"
                }
                className="w-full resize-none rounded-xl border border-input bg-background p-4 text-base outline-none focus:border-primary"
              />

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">Format</span>
                {(["16:9", "9:16"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAspect(a)}
                    className={`rounded-full border px-4 py-1.5 text-sm ${aspect === a ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                  >
                    {a === "16:9" ? "16:9 YouTube" : "9:16 TikTok/Reels"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-3 md:flex-col">
              {(
                [
                  ["realistic", "Realistic Movie", hero],
                  ["animated", "Animated Story", animated],
                ] as const
              ).map(([k, label, img]) => (
                <button
                  key={k}
                  onClick={() => setStyle(k)}
                  className={`flex-1 rounded-xl border-2 p-2 text-left ${style === k ? "border-primary" : "border-border"}`}
                >
                  <div className="relative">
                    <img src={img} alt={label} className="h-20 w-full rounded-md object-cover" />
                    <span
                      className={`absolute right-1 top-1 h-5 w-5 rounded-full border-2 border-foreground ${style === k ? "bg-primary" : ""}`}
                    />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium">{label}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={submitting || pending.length > 0}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
          >
            {submitting || pending.length > 0 ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Video
              </>
            )}
          </button>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Film className="h-6 w-6 text-primary" /> My videos
          </h2>
          {videos.isLoading ? (
            <p className="mt-4 text-muted-foreground">Loading…</p>
          ) : !videos.data?.length ? (
            <p className="mt-4 text-muted-foreground">
              No videos yet — generate your first one above.
            </p>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.data.map((v) => (
                <article
                  key={v.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div
                    className={`flex items-center justify-center bg-secondary ${v.aspect_ratio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`}
                  >
                    {v.url ? (
                      <VideoPlayer url={v.url} aspectRatio={v.aspect_ratio as "16:9" | "9:16"} />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground p-4">
                        <GenerationStatus status={v.status} error={v.error} />
                        {v.status === "failed" && (
                          <button
                            onClick={generate}
                            className="mt-2 text-xs text-primary underline"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-2 p-3">
                    <p className="line-clamp-2 flex-1 text-sm">{v.prompt}</p>
                    {v.url && (
                      <a
                        href={v.url}
                        download
                        className="p-1 text-muted-foreground hover:text-foreground"
                        aria-label="Download"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      aria-label="Delete"
                      className="p-1 text-muted-foreground hover:text-destructive"
                      onClick={async () => {
                        await remove({ data: { id: v.id } });
                        qc.invalidateQueries({ queryKey: ["videos"] });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 px-3 pb-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2 py-0.5">
                      {v.mode === "image" ? "Image" : "Text"}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5">
                      {v.style === "animated" ? "Animated" : "Realistic"}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5">
                      5s · {v.aspect_ratio}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
