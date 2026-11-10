import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Sparkles, ImagePlus, Type, X, Loader2, Film, Wand2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { VideoDisplayCard, VideoItem } from "@/components/VideoDisplayCard";
import { VideoGenerationSkeleton, VideoGridSkeleton } from "@/components/VideoSkeleton";
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
  const [activePendingGen, setActivePendingGen] = useState<{
    id: string;
    prompt: string;
    style: "realistic" | "animated";
    aspect_ratio: "16:9" | "9:16";
    stage: string;
    progress: number;
  } | null>(null);
  const [newlyCompletedId, setNewlyCompletedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const outputSectionRef = useRef<HTMLElement>(null);

  const videos = useQuery({ queryKey: ["videos"], queryFn: () => list() });

  const pendingVideos = (videos.data ?? []).filter(
    (v: any) => v.status === "queued" || v.status === "in_progress",
  );

  // Poll pending jobs every 3.5s for fast, responsive live feedback
  useEffect(() => {
    const targetIds = [
      ...pendingVideos.map((p: any) => p.id),
      ...(activePendingGen?.id ? [activePendingGen.id] : []),
    ];

    if (!targetIds.length) return;

    const interval = setInterval(async () => {
      let shouldRefresh = false;
      for (const id of targetIds) {
        try {
          const res: any = await check({ data: { id } });
          if (res) {
            if (activePendingGen && activePendingGen.id === id) {
              setActivePendingGen((prev) =>
                prev
                  ? {
                      ...prev,
                      stage: res.stage || prev.stage,
                      progress: res.progress || prev.progress,
                    }
                  : null,
              );
            }

            if (res.status === "completed" || res.status === "failed") {
              shouldRefresh = true;
              if (res.status === "completed") {
                toast.success("Your 5-second AI video is ready!");
                setNewlyCompletedId(id);
                setActivePendingGen(null);
              } else {
                toast.error(res.error || "Generation could not be completed.");
                setActivePendingGen(null);
              }
            }
          }
        } catch (e) {
          console.error("[Polling error]", e);
        }
      }

      if (shouldRefresh) {
        qc.invalidateQueries({ queryKey: ["videos"] });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [pendingVideos.map((p: any) => p.id).join(","), activePendingGen?.id, check, qc]);

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
    const submittedPrompt = prompt.trim();
    const submittedStyle = style;
    const submittedAspect = aspect;

    // Optimistically show skeleton screen immediately
    const optimisticId = `gen-${Date.now()}`;
    setActivePendingGen({
      id: optimisticId,
      prompt: submittedPrompt,
      style: submittedStyle,
      aspect_ratio: submittedAspect,
      stage: "Enhancing prompt with AI…",
      progress: 20,
    });

    // Smoothly scroll down to output section so user watches live generation
    setTimeout(() => {
      outputSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    try {
      const res: any = await create({
        data: {
          prompt: submittedPrompt,
          style: submittedStyle,
          aspectRatio: submittedAspect,
          image: mode === "image" && image ? { data: image.data, mimeType: image.mimeType } : null,
        },
      });

      if (res?.id) {
        setActivePendingGen({
          id: res.id,
          prompt: submittedPrompt,
          style: submittedStyle,
          aspect_ratio: submittedAspect,
          stage: "Rendering 5-second video frames…",
          progress: 45,
        });
      }

      toast.success("Generation started! Your video will appear below once ready.");
      qc.invalidateQueries({ queryKey: ["videos"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start generation");
      setActivePendingGen(null);
    } finally {
      setSubmitting(false);
    }
  }

  const handleRemix = (v: VideoItem) => {
    setPrompt(v.prompt);
    setStyle(v.style);
    setAspect(v.aspect_ratio);
    if (v.mode) setMode(v.mode);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Prompt loaded into studio creator form.");
  };

  const handleDelete = async (id: string) => {
    await remove({ data: { id } });
    if (newlyCompletedId === id) setNewlyCompletedId(null);
    qc.invalidateQueries({ queryKey: ["videos"] });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Title */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Create a <span className="text-primary">5-second</span> movie.
          </h1>
          <p className="mt-2 text-lg text-sky">Describe a scene, or bring a photo to life.</p>
        </div>

        {/* Video Generation Studio Form */}
        <section className="rounded-[2.5rem] border-2 border-primary p-5 shadow-frame md:p-8 bg-card/40 backdrop-blur-sm">
          <div className="grid gap-6 rounded-2xl border border-border bg-card/80 p-5 md:grid-cols-[1fr_220px]">
            <div className="space-y-5">
              {/* Mode Switcher */}
              <div className="inline-flex rounded-full bg-secondary/80 p-1 border border-border/60">
                {(["text", "image"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                      mode === m
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
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

              {/* Optional Image Upload */}
              {mode === "image" && (
                <div>
                  {image ? (
                    <div className="relative inline-block">
                      <img
                        src={image.preview}
                        alt="Upload preview"
                        className="h-44 rounded-xl object-cover border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-md hover:bg-background transition"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-muted-foreground hover:border-primary hover:text-foreground transition"
                    >
                      <ImagePlus className="h-8 w-8 text-primary" />
                      <span className="font-medium text-sm">Upload a starting photo to animate</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG or WebP up to 6MB</span>
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

              {/* Prompt Textarea */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Scene Description & Motion Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder={
                    mode === "image"
                      ? "How should the photo move? e.g. She gently turns toward the camera, wind blowing through her hair at sunset…"
                      : "A young African queen in a glowing emerald gown walks across the savannah at golden hour, cinematic lighting…"
                  }
                  className="w-full resize-none rounded-xl border border-input bg-background p-4 text-base outline-none focus:border-primary transition"
                />
              </div>

              {/* Aspect Ratio Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Aspect Ratio:
                </span>
                {(["16:9", "9:16"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAspect(a)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                      aspect === a
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {a === "16:9" ? "16:9 Landscape (YouTube / Web)" : "9:16 Portrait (TikTok / Reels)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Style Selector */}
            <div className="flex flex-row gap-3 md:flex-col justify-center">
              {(
                [
                  ["realistic", "Realistic Movie", hero],
                  ["animated", "Animated Story", animated],
                ] as const
              ).map(([k, label, img]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setStyle(k)}
                  className={`group relative flex-1 rounded-2xl border-2 p-2.5 text-left transition ${
                    style === k
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/80 hover:border-primary/50"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={img}
                      alt={label}
                      className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span
                      className={`absolute right-2 top-2 h-5 w-5 rounded-full border-2 border-white shadow-md transition ${
                        style === k ? "bg-primary" : "bg-black/40"
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-bold text-foreground">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={generate}
            disabled={submitting || !!activePendingGen}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-base font-bold text-primary-foreground shadow-glow hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
          >
            {submitting || !!activePendingGen ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>AI Video Generation in Progress…</span>
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                <span>Generate 5-Second Video (1 Credit)</span>
              </>
            )}
          </button>
        </section>

        {/* Video Output & Gallery Section */}
        <section ref={outputSectionRef} className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2.5">
              <Film className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-extrabold tracking-tight">Generated Videos</h2>
            </div>
            {videos.data && (
              <span className="text-xs text-muted-foreground font-medium">
                {videos.data.length} {videos.data.length === 1 ? "video" : "videos"} in studio
              </span>
            )}
          </div>

          {/* Active Generation Skeleton Screen Banner */}
          {activePendingGen && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                Active Video Output in Generation
              </h3>
              <div className="max-w-xl">
                <VideoGenerationSkeleton
                  prompt={activePendingGen.prompt}
                  aspectRatio={activePendingGen.aspect_ratio}
                  style={activePendingGen.style}
                  stage={activePendingGen.stage}
                  progress={activePendingGen.progress}
                />
              </div>
            </div>
          )}

          {/* Video List / Grid Display */}
          {videos.isLoading ? (
            <VideoGridSkeleton count={3} />
          ) : !videos.data?.length && !activePendingGen ? (
            <div className="rounded-2xl border-2 border-dashed border-border/80 p-12 text-center bg-card/30">
              <Film className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
              <p className="text-base font-semibold text-foreground">No videos generated yet</p>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
                Type your creative scene in the prompt box above and hit Generate to see your first AI movie!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Show any other pending videos from server as skeletons */}
              {pendingVideos
                .filter((pv: any) => pv.id !== activePendingGen?.id)
                .map((pv: any) => (
                  <VideoGenerationSkeleton
                    key={pv.id}
                    prompt={pv.prompt}
                    aspectRatio={pv.aspect_ratio}
                    style={pv.style}
                    stage={pv.stage || "Rendering video frames…"}
                    progress={pv.progress || 50}
                  />
                ))}

              {/* Show completed videos using the rich VideoDisplayCard */}
              {videos.data
                ?.filter((v: any) => v.status === "completed" || (!v.status && v.url))
                .map((v: any) => (
                  <VideoDisplayCard
                    key={v.id}
                    video={v}
                    onDelete={handleDelete}
                    onRemix={handleRemix}
                    priority={v.id === newlyCompletedId}
                  />
                ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
