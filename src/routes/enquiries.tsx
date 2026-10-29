import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listEnquiries, type EnquiryRecord } from "@/lib/enquiries";

const KEY = "cbl-bookings";

const loadEnquiries = createServerFn({ method: "POST" })
  .inputValidator((input: { key: string }) => input)
  .handler(async ({ data }) => {
    if (data.key !== KEY) return { ok: false as const, rows: [] as EnquiryRecord[] };
    const rows = await listEnquiries();
    return { ok: true as const, rows };
  });

export const Route = createFileRoute("/enquiries")({
  head: () => seo({ title: "Enquiries | CreatedByLewis", path: "/enquiries", noindex: true }),
  component: EnquiriesPage,
});

function EnquiriesPage() {
  const [key, setKey] = useState("");
  const [rows, setRows] = useState<EnquiryRecord[] | null>(null);
  const [error, setError] = useState("");

  async function open(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const result = await loadEnquiries({ data: { key } });
    if (!result.ok) {
      setRows(null);
      setError("That key is not right.");
      return;
    }
    setRows(result.rows);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-ink">Enquiries</h1>
      <p className="mt-3 text-muted">Bookings, estimates, orders, and price requests. Not linked from the site.</p>
      <form onSubmit={open} className="mt-6 flex gap-3">
        <input
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="min-h-11 flex-1 rounded-full border border-line bg-paper px-4 text-ink"
          placeholder="Key"
          autoComplete="current-password"
        />
        <button type="submit" className="min-h-11 rounded-full bg-ink px-5 text-sm text-paper">
          Open
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-muted">{error}</p> : null}
      {rows ? (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {rows.length === 0 ? <li className="py-4 text-muted">Nothing stored yet.</li> : null}
          {rows.map((row) => (
            <li key={row.id} className="py-4">
              <p className="text-xs tracking-widest text-muted uppercase">
                {row.kind} · {new Date(row.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London" })}
              </p>
              <p className="mt-1 font-medium text-ink">
                {row.name || "No name"}
                {row.business ? ` · ${row.business}` : ""}
              </p>
              <p className="text-sm text-muted">
                {row.email}
                {row.phone ? ` · ${row.phone}` : ""}
              </p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-ink">{row.message}</pre>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
