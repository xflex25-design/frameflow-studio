import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function GenerationStatus({
  stage,
  status,
  error,
}: {
  stage?: string | null;
  status: string;
  error?: string | null;
}) {
  if (status === "completed")
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle2 className="h-4 w-4" /> Ready
      </div>
    );
  if (status === "failed")
    return (
      <div className="flex items-center gap-2 text-red-600">
        <AlertCircle className="h-4 w-4" /> {error || "Failed"}
      </div>
    );

  return (
    <div className="flex items-center gap-2 text-primary">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{stage || "Processing"}…</span>
    </div>
  );
}
