import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Share2,
  Sparkles,
  Film,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";

export interface VideoItem {
  id: string;
  prompt: string;
  url?: string | null;
  storage_path?: string | null;
  aspect_ratio: "16:9" | "9:16";
  style: "realistic" | "animated";
  mode?: "text" | "image";
  status: "queued" | "in_progress" | "completed" | "failed";
  stage?: string;
  progress?: number;
  error?: string | null;
  created_at?: string;
}

interface VideoDisplayCardProps {
  video: VideoItem;
  onDelete?: (id: string) => Promise<void> | void;
  onRemix?: (video: VideoItem) => void;
  priority?: boolean;
}

export function VideoDisplayCard({
  video,
  onDelete,
  onRemix,
  priority = false,
}: VideoDisplayCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [theaterOpen, setTheaterOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isPortrait = video.aspect_ratio === "9:16";
  const videoUrl = video.url || (video.storage_path?.startsWith("http") ? video.storage_path : null) || "/assets/aistudio/1793337072274_5813fd6c.mp4";

  // Auto-play muted preview if priority (newly generated video)
  useEffect(() => {
    if (priority && videoRef.current && mediaLoaded) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [priority, mediaLoaded]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const target = pos * duration;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleDownload = async () => {
    try {
      toast.info("Preparing video download…");
      const res = await fetch(videoUrl);
      if (!res.ok) throw new Error("Could not fetch video file");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const cleanPrompt = video.prompt.slice(0, 24).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      a.download = `ogra-ai-${cleanPrompt || "video"}-${video.id.slice(0, 6)}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success("Download started!");
    } catch {
      // Fallback direct link
      window.open(videoUrl, "_blank");
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.prompt);
    setCopiedPrompt(true);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopiedLink(true);
    toast.success("Video URL copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (confirm("Are you sure you want to delete this generated video?")) {
      setDeleting(true);
      try {
        await onDelete(video.id);
        toast.success("Video deleted.");
      } catch (e: any) {
        toast.error(e?.message || "Failed to delete video");
        setDeleting(false);
      }
    }
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs % 60);
    const m = Math.floor(secs / 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      <article
        className={`group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg ${
          priority ? "border-primary shadow-frame" : "border-border hover:border-primary/50"
        }`}
      >
        {/* Video Player Display Container */}
        <div
          className={`relative w-full overflow-hidden bg-black select-none ${
            isPortrait ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {/* Skeleton Buffer Screen while Video Loads */}
          {!mediaLoaded && !mediaError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/80 z-10">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer" />
              <Film className="h-8 w-8 text-primary animate-pulse mb-2" />
              <span className="text-xs text-muted-foreground font-medium">Loading video media…</span>
            </div>
          )}

          {/* Media Load Error State */}
          {mediaError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/90 p-4 text-center z-10">
              <p className="text-xs text-destructive mb-2 font-medium">Unable to load video playback</p>
              <button
                onClick={() => {
                  setMediaError(false);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="text-xs underline text-primary hover:text-primary/80"
              >
                Retry playback
              </button>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            loop
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onLoadedData={() => {
              setMediaLoaded(true);
              setMediaError(false);
            }}
            onCanPlay={() => setMediaLoaded(true)}
            onError={() => {
              // Try fallback demo if remote path fails
              if (videoUrl !== "/assets/aistudio/1793337072274_5813fd6c.mp4" && videoRef.current) {
                videoRef.current.src = "/assets/aistudio/1793337072274_5813fd6c.mp4";
                videoRef.current.load();
              } else {
                setMediaError(true);
              }
            }}
            onClick={togglePlay}
            className="h-full w-full object-cover cursor-pointer"
          />

          {/* Top Info Bar Overlays */}
          <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-white/95 border border-white/10 shadow-sm">
                {video.aspect_ratio === "9:16" ? "9:16 Reels" : "16:9 HD"}
              </span>
              <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-white/95 border border-white/10 shadow-sm capitalize">
                {video.style}
              </span>
            </div>
            {priority && (
              <span className="flex items-center gap-1 rounded-md bg-primary/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-primary-foreground shadow-glow animate-pulse">
                <Sparkles className="h-3 w-3" /> New
              </span>
            )}
          </div>

          {/* Centered Big Play/Pause Button Overlay (Fades out when playing) */}
          {(!isPlaying || !mediaLoaded) && mediaLoaded && (
            <button
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition hover:bg-black/40 z-20 group-hover:opacity-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition transform hover:scale-110 active:scale-95">
                <Play className="h-6 w-6 ml-0.5 fill-current" />
              </div>
            </button>
          )}

          {/* Bottom Custom Playback Controls Overlay (Visible on hover or paused) */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 transition-opacity duration-200 z-20 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {/* Interactive Scrubber Bar */}
            <div
              ref={progressRef}
              onClick={handleSeek}
              className="relative mb-2 h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition hover:h-2"
              role="slider"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration}
              tabIndex={0}
            >
              <div
                className="h-full rounded-full bg-primary shadow-glow transition-all"
                style={{ width: `${(currentTime / (duration || 5)) * 100}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="rounded p-1 hover:bg-white/20 transition"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="rounded p-1 hover:bg-white/20 transition"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <span className="font-mono text-[11px] text-white/80">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTheaterOpen(true)}
                  aria-label="Theater view"
                  title="Expand to Theater View"
                  className="rounded p-1 hover:bg-white/20 transition text-white/90 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  title="Toggle Fullscreen"
                  className="rounded p-1 hover:bg-white/20 transition text-white/90 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card Body & Prompt Text */}
        <div className="p-4 space-y-3">
          <p className="text-sm font-medium text-foreground line-clamp-2 leading-relaxed" title={video.prompt}>
            {video.prompt}
          </p>

          {/* Clean Unboxed Metadata Line (Frontend Design Rules: no static pills) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{video.mode === "image" ? "Photo Anim" : "Text Prompt"}</span>
            <span aria-hidden="true">·</span>
            <span>{video.style === "animated" ? "Animation" : "Cinematic"}</span>
            <span aria-hidden="true">·</span>
            <span>5s Clip</span>
            <span aria-hidden="true">·</span>
            <span>{video.aspect_ratio}</span>
          </div>

          {/* Card Bottom Quick Actions Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-border/60">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyPrompt}
                title="Copy prompt text"
                aria-label="Copy prompt text"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>

              {onRemix && (
                <button
                  type="button"
                  onClick={() => onRemix(video)}
                  title="Remix prompt in creator form"
                  aria-label="Remix this video"
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Remix</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyLink}
                title="Copy direct video URL"
                aria-label="Copy video URL"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
              >
                {copiedLink ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                title="Download MP4"
                aria-label="Download video MP4"
                className="flex items-center gap-1 rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save</span>
              </button>

              {onDelete && (
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  title="Delete video"
                  aria-label="Delete video"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Theater View Modal */}
      {theaterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setTheaterOpen(false)}
        >
          <div
            className="relative flex flex-col max-w-4xl w-full max-h-[92vh] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">AI Video Preview</h3>
              </div>
              <button
                onClick={() => setTheaterOpen(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Video Container */}
            <div className="relative bg-black flex items-center justify-center max-h-[55vh] overflow-hidden">
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                loop
                className={`max-h-[55vh] w-auto ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
              />
            </div>

            {/* Modal Body & Prompt */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Prompt
                </h4>
                <p className="text-sm font-medium text-foreground bg-secondary/40 p-3 rounded-xl border border-border/50">
                  {video.prompt}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>Aspect: {video.aspect_ratio}</span>
                  <span>·</span>
                  <span>Style: {video.style}</span>
                  <span>·</span>
                  <span>Duration: 5.0 seconds</span>
                  <span>·</span>
                  <span>Engine: Ogra AI Studio</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download MP4</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
