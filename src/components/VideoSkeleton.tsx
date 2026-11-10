import { Loader2, Sparkles, Film, CheckCircle2, Clock } from "lucide-react";

interface VideoGenerationSkeletonProps {
  prompt?: string;
  aspectRatio?: "16:9" | "9:16";
  style?: "realistic" | "animated";
  stage?: string;
  progress?: number;
  className?: string;
}

export function VideoGenerationSkeleton({
  prompt,
  aspectRatio = "16:9",
  style = "realistic",
  stage = "Rendering video frames...",
  progress = 45,
  className = "",
}: VideoGenerationSkeletonProps) {
  const isPortrait = aspectRatio === "9:16";

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border-2 border-primary/40 bg-card shadow-frame transition-all ${className}`}
      aria-busy="true"
      aria-label="Generating video preview"
    >
      {/* Aspect Ratio Video Container with Shimmer Effect */}
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-secondary/80 via-card to-secondary/60 flex flex-col items-center justify-center p-6 text-center select-none ${
          isPortrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {/* Shimmer sweep effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer" />
        </div>

        {/* Ambient background pulsing glow */}
        <div className="absolute -inset-10 bg-primary/10 blur-3xl opacity-50 animate-pulse pointer-events-none" />

        {/* Center Progress & Stage Animation */}
        <div className="relative z-10 flex flex-col items-center max-w-sm px-4">
          <div className="relative flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shadow-glow animate-pulse">
              <Film className="h-7 w-7 text-primary animate-bounce" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-primary/40 text-primary">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary mb-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>AI Rendering In Progress</span>
          </div>

          <p className="text-sm font-medium text-foreground tracking-tight line-clamp-1 mb-1">
            {stage}
          </p>

          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
            <Clock className="h-3 w-3" />
            <span>Estimated ~15–30s remaining</span>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-secondary/80 rounded-full h-2 overflow-hidden border border-border/60">
            <div
              className="bg-primary h-full rounded-full transition-all duration-700 ease-out shadow-glow"
              style={{ width: `${Math.min(Math.max(progress, 15), 95)}%` }}
            />
          </div>

          {/* Micro Stages Step Tracker */}
          <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="h-3 w-3" /> Enhance
            </span>
            <span className="text-border">→</span>
            <span className="flex items-center gap-1 text-primary font-medium">
              <Loader2 className="h-3 w-3 animate-spin" /> Render
            </span>
            <span className="text-border">→</span>
            <span className="flex items-center gap-1 opacity-60">
              Encode
            </span>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white/90 border border-white/10">
            {aspectRatio === "9:16" ? "9:16 Reels" : "16:9 YouTube"}
          </span>
          <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white/90 border border-white/10 capitalize">
            {style}
          </span>
        </div>
      </div>

      {/* Card Details / Prompt Skeleton */}
      <div className="p-4 space-y-3">
        {prompt ? (
          <p className="text-sm font-medium text-foreground/90 line-clamp-2 italic">
            "{prompt}"
          </p>
        ) : (
          <div className="space-y-2">
            <div className="h-4 w-4/5 rounded bg-muted/60 animate-pulse" />
            <div className="h-3.5 w-1/2 rounded bg-muted/40 animate-pulse" />
          </div>
        )}

        {/* Metadata & Placeholder Action Buttons */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>Processing cinematic frames…</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-40">
            <div className="h-7 w-7 rounded-lg bg-muted animate-pulse" />
            <div className="h-7 w-7 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function VideoCardSkeleton({
  aspectRatio = "16:9",
}: {
  aspectRatio?: "16:9" | "9:16";
}) {
  const isPortrait = aspectRatio === "9:16";

  return (
    <article
      className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition-all shadow-sm"
      aria-hidden="true"
    >
      <div
        className={`relative w-full overflow-hidden bg-secondary/70 flex items-center justify-center ${
          isPortrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer" />
        <Film className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          <div className="h-4 w-5/6 rounded bg-muted/70 animate-pulse" />
          <div className="h-3.5 w-3/5 rounded bg-muted/50 animate-pulse" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="h-3.5 w-24 rounded bg-muted/50 animate-pulse" />
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded bg-muted/60 animate-pulse" />
            <div className="h-6 w-6 rounded bg-muted/60 animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function VideoGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} aspectRatio={i === 1 ? "9:16" : "16:9"} />
      ))}
    </div>
  );
}
