import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listVideos } from "@/lib/video.functions";
import { getSubscription } from "@/lib/pricing";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const list = useServerFn(listVideos);
  const getSub = useServerFn(getSubscription);

  const videos = useQuery({ queryKey: ["videos"], queryFn: () => list() });
  const sub = useQuery({ queryKey: ["subscription"], queryFn: () => getSub() });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h2 className="text-muted-foreground text-sm font-medium">Credit Balance</h2>
          <p className="text-4xl font-bold mt-2">{sub.data?.credits_remaining ?? 0}</p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h2 className="text-muted-foreground text-sm font-medium">Subscription Plan</h2>
          <p className="text-4xl font-bold mt-2 capitalize">{sub.data?.plan ?? "Free"}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Videos</h2>
      {videos.data && videos.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.data.map((v) => (
            <div
              key={v.id}
              className="bg-card p-4 rounded-xl border border-border hover:border-primary transition"
            >
              <p className="font-medium truncate">{v.prompt}</p>
              <p className="text-sm text-muted-foreground capitalize mt-1">{v.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No videos generated yet.</p>
      )}
    </DashboardLayout>
  );
}
