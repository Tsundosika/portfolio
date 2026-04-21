import { readRequests } from "@/lib/requests";
import { readSettings } from "@/lib/gallery";
import { CommissionList } from "@/components/admin/commission-list";
import { CommissionsToggle } from "@/components/admin/commissions-toggle";

export const dynamic = "force-dynamic";
export const metadata = { title: "Commissions — Ren's Studio" };

export default async function CommissionsPage() {
  const [requests, { commissionsOpen }] = await Promise.all([
    readRequests(),
    readSettings(),
  ]);

  const pending  = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ink">Commissions</h1>
        <p className="text-ink/45 mt-1">
          {pending} pending · {accepted} in progress
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-ink mb-3">Accepting requests</h2>
        <CommissionsToggle open={commissionsOpen} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink mb-4">Requests</h2>
        <CommissionList requests={requests} />
      </section>
    </>
  );
}
