import { useState } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  aspectRatio: "16:9" | "9:16";
  className?: string;
}

export function VideoPlayer({ url, aspectRatio, className = "" }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"} ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <video
        src={url}
        controls
        playsInline
        onLoadedData={() => setLoading(false)}
        className="h-full w-full object-cover"
        onCanPlay={() => setLoading(false)}
      />
    </div>
  );
}
