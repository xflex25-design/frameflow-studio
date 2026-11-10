import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listVideos, deleteVideo } from "@/lib/video.functions";
import { getSubscription } from "@/lib/pricing";
import { DashboardLayout } from "@/components/DashboardLayout";
import { VideoDisplayCard, VideoItem } from "@/components/VideoDisplayCard";
import { VideoGridSkeleton } from "@/components/VideoSkeleton";
import { Coins, Film, Plus, Sparkles, Wand2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ogra AI" },
      { name: "description", content: "Overview of your Ogra AI video projects and credits." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const list = useServerFn(listVideos);
  const getSub = useServerFn(getSubscription);
  const remove = useServerFn(deleteVideo);

  const videos = useQuery({ queryKey: ["videos"], queryFn: () => list() });
  const sub = useQuery({ queryKey: ["subscription"], queryFn: () => getSub() });

  const handleDelete = async (id: string) => {
    await remove({ data: { id } });
    qc.invalidateQueries({ queryKey: ["videos"] });
  };

  const handleRemix = (v: VideoItem) => {
    navigate({ to: "/studio" });
  };

  const completedVideos = (videos.data ?? []).filter(
    (v: any) => v.status === "completed" || (!v.status && v.url),
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Studio Dashboard</h1>
            <p className="mt-1 text-sm text-sky">Manage your generated AI movies, credits, and exports.</p>
          </div>
          <Link
            to="/studio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Video</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Video Credits
              </h2>
              <p className="text-3xl font-extrabold mt-1 text-foreground">
                {sub.data?.credits_remaining ?? 10}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">1 credit per 5s HD movie</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Coins className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Subscription Plan
              </h2>
              <p className="text-3xl font-extrabold mt-1 capitalize text-foreground">
                {sub.data?.plan ?? "Free"}
              </p>
              <Link to="/pricing" className="text-[11px] text-primary hover:underline mt-1 block">
                Upgrade plan →
              </Link>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Total Generated
              </h2>
              <p className="text-3xl font-extrabold mt-1 text-foreground">
                {videos.data?.length ?? 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Movies in your library</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Film className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Recent Generated Videos */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              <span>Recent Generated Outputs</span>
            </h2>
            <Link to="/studio" className="text-xs font-semibold text-primary hover:underline">
              Open Studio →
            </Link>
          </div>

          {videos.isLoading ? (
            <VideoGridSkeleton count={3} />
          ) : !completedVideos.length ? (
            <div className="rounded-2xl border-2 border-dashed border-border/80 p-10 text-center bg-card/40">
              <Film className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
              <p className="font-semibold text-foreground">No videos in your library yet</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Generate your first video in the studio to start building your film catalog.
              </p>
              <Link
                to="/studio"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                <Wand2 className="h-3.5 w-3.5" /> Go to Studio
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedVideos.slice(0, 6).map((v: any) => (
                <VideoDisplayCard
                  key={v.id}
                  video={v}
                  onDelete={handleDelete}
                  onRemix={handleRemix}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
