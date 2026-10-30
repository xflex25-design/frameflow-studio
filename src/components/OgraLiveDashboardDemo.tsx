import { useState, useRef, useEffect } from "react";
import {
  Type,
  ImagePlus,
  Sparkles,
  Loader2,
  CheckCircle2,
  Play,
  Pause,
  Download,
  Film,
  RefreshCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import hero from "@/assets/hero-scene.jpg";
import animated from "@/assets/animated-thumb.jpg";

export function OgraLiveDashboardDemo() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [prompt, setPrompt] = useState(
    "A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…",
  );
  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [style, setStyle] = useState<"realistic" | "animated">("realistic");

  // Live generation state simulation
  const [status, setStatus] = useState<"idle" | "script" | "scenes" | "assembling" | "completed">(
    "completed",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(100);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startGenerationSimulation = () => {
    setStatus("script");
    setProgress(20);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setTimeout(() => {
      setStatus("scenes");
      setProgress(55);
    }, 1400);

    setTimeout(() => {
      setStatus("assembling");
      setProgress(85);
    }, 2800);

    setTimeout(() => {
      setStatus("completed");
      setProgress(100);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 4200);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const isGenerating = status !== "idle" && status !== "completed";

  return (
    <section className="mt-20 scroll-mt-24">
      {/* Title & Eyebrow */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" /> LIVE STUDIO DEMO
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          See Your Story <br className="hidden sm:inline" />
          <span className="text-primary">Come to Life.</span>
        </h2>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Experience the real OGRA AI Studio dashboard in action. Try changing prompts, styles, or
          click Generate to watch live generation.
        </p>
      </div>

      {/* Main 2-Column Responsive Container: Left = Real Ogra Card, Right = Live Video Player */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Exact OGRA Studio Dashboard Card matching screenshot */}
        <div className="lg:col-span-6 w-full mx-auto max-w-lg">
          <div className="rounded-[2.5rem] border-2 border-primary bg-[#08080d] p-5 sm:p-7 shadow-glow">
            {/* 1. Mode Pill Switcher */}
            <div className="inline-flex rounded-full bg-[#161622] p-1 border border-border/60">
              <button
                type="button"
                onClick={() => setMode("text")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  mode === "text"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Type className="h-4 w-4" /> Text to Video
              </button>
              <button
                type="button"
                onClick={() => setMode("image")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  mode === "image"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImagePlus className="h-4 w-4" /> Image to Video
              </button>
            </div>

            {/* 2. Prompt Textarea Card */}
            <div className="mt-6 rounded-2xl border border-border/80 bg-[#101018] p-4 transition focus-within:border-primary/80">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                maxLength={2000}
                placeholder="A young woman in a red headwrap walks through a village at golden sunset, drums in the distance…"
                className="w-full resize-none bg-transparent text-sm sm:text-base leading-relaxed text-foreground placeholder-muted-foreground/70 outline-none"
              />
            </div>

            {/* 3. Format Selection */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Format</span>
              <button
                type="button"
                onClick={() => setAspect("16:9")}
                className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                  aspect === "16:9"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                16:9 YouTube
              </button>
              <button
                type="button"
                onClick={() => setAspect("9:16")}
                className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                  aspect === "9:16"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                9:16 TikTok/Reels
              </button>
            </div>

            {/* 4. Style Selection Cards (2-column layout matching reference screenshot) */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              {/* Realistic Movie Card */}
              <button
                type="button"
                onClick={() => setStyle("realistic")}
                className={`group relative rounded-2xl p-2.5 text-left transition border-2 ${
                  style === "realistic"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/70 bg-[#12121c] hover:border-muted-foreground"
                }`}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                  <img
                    src={hero}
                    alt="Realistic Movie"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Selection Radio Indicator */}
                  <span
                    className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      style === "realistic"
                        ? "border-white bg-primary"
                        : "border-white/90 bg-black/40"
                    }`}
                  >
                    {style === "realistic" && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                </div>
                <p className="mt-3 text-center text-xs sm:text-sm font-bold text-foreground">
                  Realistic Movie
                </p>
              </button>

              {/* Animated Story Card */}
              <button
                type="button"
                onClick={() => setStyle("animated")}
                className={`group relative rounded-2xl p-2.5 text-left transition border-2 ${
                  style === "animated"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/70 bg-[#12121c] hover:border-muted-foreground"
                }`}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                  <img
                    src={animated}
                    alt="Animated Story"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Selection Radio Indicator */}
                  <span
                    className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      style === "animated"
                        ? "border-white bg-primary"
                        : "border-white/90 bg-black/40"
                    }`}
                  >
                    {style === "animated" && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                </div>
                <p className="mt-3 text-center text-xs sm:text-sm font-bold text-foreground">
                  Animated Story
                </p>
              </button>
            </div>

            {/* 5. Generate Video Button */}
            <button
              type="button"
              onClick={startGenerationSimulation}
              disabled={isGenerating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-base sm:text-lg font-bold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.99] disabled:opacity-75"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Video ({progress}%)…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Video
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Video Output Showcase */}
        <div className="lg:col-span-6 w-full mx-auto max-w-lg">
          <div className="rounded-[2.5rem] border-2 border-border bg-[#08080d] p-5 sm:p-7 shadow-frame flex flex-col justify-between">
            {/* Live Pipeline Status Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-border/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isGenerating ? "bg-primary" : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isGenerating ? "bg-primary" : "bg-emerald-500"
                    }`}
                  />
                </span>
                <span className="font-bold tracking-wide text-foreground uppercase">
                  {status === "script" && "Writing Script with Gemini…"}
                  {status === "scenes" && "Rendering ZeroGPU Frame Sequence…"}
                  {status === "assembling" && "Multiplexing Audio & Speech…"}
                  {status === "completed" && "Generation Ready (1080p)"}
                </span>
              </div>

              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground border border-border">
                {aspect === "16:9" ? "16:9 Cinema" : "9:16 Vertical"}
              </span>
            </div>

            {/* Live Video Stage */}
            <div className="mt-4 relative overflow-hidden rounded-2xl border border-border/80 bg-black aspect-video flex items-center justify-center group">
              <video
                ref={videoRef}
                src="/assets/aistudio/1793337072274_5813fd6c.mp4"
                playsInline
                loop
                muted={isMuted}
                className="h-full w-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Live Generation Progress Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 p-6 backdrop-blur-sm text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                  <p className="text-sm font-bold text-foreground">
                    {status === "script" && "Directing Scene 1 with Gemini 3.5…"}
                    {status === "scenes" && "Synthesizing 5s Video with LTX Engine…"}
                    {status === "assembling" && "Mastering 1080p HD Video Output…"}
                  </p>
                  <div className="w-48 h-2 rounded-full bg-secondary mt-3 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 font-mono">
                    ZeroGPU Queue: Active
                  </span>
                </div>
              )}

              {/* Play / Pause Center Overlay */}
              {!isGenerating && !isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play demo video"
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition hover:scale-110 hover:bg-primary"
                >
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                </button>
              )}

              {/* Video Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur border border-primary/30">
                <CheckCircle2 className="h-3 w-3" /> OGRA AI ENGINE
              </div>

              {/* Volume Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label="Toggle mute"
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/90 transition"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Generated Scenes Strip */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Film className="h-3.5 w-3.5 text-primary" /> Generated Scenes
                </span>
                <span className="text-[11px]">Duration: 5.0s</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="rounded-xl border border-primary/50 bg-secondary/30 p-2 flex items-center gap-2.5">
                  <div className="h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-border">
                    <img src={hero} alt="Scene 1" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-foreground">Scene 1</p>
                    <p className="text-muted-foreground text-[10px]">0:00 - 0:05</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-secondary/20 p-2 flex items-center gap-2.5 opacity-80">
                  <div className="h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-border">
                    <img src={animated} alt="Scene 2" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-foreground">Scene 2</p>
                    <p className="text-muted-foreground text-[10px]">0:05 - 0:10</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={startGenerationSimulation}
                className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Re-generate
              </button>

              <a
                href="/assets/aistudio/1793337072274_5813fd6c.mp4"
                download="ogra-demo.mp4"
                className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition shadow-sm"
              >
                <Download className="h-3.5 w-3.5" /> Download 1080p
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
