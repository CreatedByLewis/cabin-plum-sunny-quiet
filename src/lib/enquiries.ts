import { getSql } from "@/lib/db";

export type EnquiryRecord = {
  id: number;
  createdAt: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  subject: string;
  message: string;
};

export async function saveEnquiry(input: {
  kind: string;
  name: string;
  email: string;
  phone?: string;
  business?: string;
  subject: string;
  message: string;
}) {
  try {
    const sql = await getSql();
    await sql`
      insert into enquiries (kind, name, email, phone, business, subject, message)
      values (
        ${input.kind},
        ${input.name},
        ${input.email},
        ${input.phone ?? ""},
        ${input.business ?? ""},
        ${input.subject},
        ${input.message}
      )
    `;
  } catch {
    // The email still sends. A storage miss must not block the enquiry.
  }
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    created_at: string;
    kind: string;
    name: string;
    email: string;
    phone: string;
    business: string;
    subject: string;
    message: string;
  }>`
    select id, created_at, kind, name, email, phone, business, subject, message
    from enquiries
    order by created_at desc
    limit 200
  `;
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    kind: row.kind,
    name: row.name,
    email: row.email,
    phone: row.phone,
    business: row.business,
    subject: row.subject,
    message: row.message,
  }));
}
