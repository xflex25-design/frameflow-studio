import { useState, useRef } from "react";
import { Loader2, Play, Pause, Film } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  aspectRatio: "16:9" | "9:16";
  className?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  url,
  aspectRatio,
  className = "",
  autoPlay = false,
}: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPortrait = aspectRatio === "9:16";
  const safeUrl = url || "/assets/aistudio/1793337072274_5813fd6c.mp4";

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className={`group relative w-full overflow-hidden bg-black select-none ${
        isPortrait ? "aspect-[9/16]" : "aspect-video"
      } ${className}`}
    >
      {/* Skeleton screen overlay while buffering/loading video stream */}
      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/80 z-10">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-2">
            <Film className="h-6 w-6 animate-pulse" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Loading video player…</span>
        </div>
      )}

      {/* Media Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/90 p-4 text-center z-10">
          <p className="text-xs text-destructive mb-2 font-medium">Failed to stream video</p>
          <button
            onClick={() => {
              setError(false);
              setLoading(true);
              if (videoRef.current) videoRef.current.load();
            }}
            className="text-xs underline text-primary"
          >
            Retry
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        src={safeUrl}
        controls
        playsInline
        loop
        autoPlay={autoPlay}
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onError={() => {
          if (safeUrl !== "/assets/aistudio/1793337072274_5813fd6c.mp4" && videoRef.current) {
            videoRef.current.src = "/assets/aistudio/1793337072274_5813fd6c.mp4";
            videoRef.current.load();
          } else {
            setError(true);
            setLoading(false);
          }
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
