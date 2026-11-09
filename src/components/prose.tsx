import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Block } from "@/lib/blog";

// Renders **bold** and [label](href). Internal links use the router.
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <strong key={key++} className="font-medium text-ink">
          {match[1]}
        </strong>,
      );
    } else {
      const [label, href] = [match[2], match[3]];
      const cls = "text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal";
      parts.push(
        href.startsWith("/") ? (
          <Link key={key++} to={href} className={cls}>
            {label}
          </Link>
        ) : (
          <a key={key++} href={href} className={cls} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-muted">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-6 font-display text-3xl leading-display font-medium text-ink sm:text-4xl">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-xl font-medium text-ink">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-6">
                    <span aria-hidden className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-signal" />
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside key={i} className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <p className="text-xs tracking-widest text-signal uppercase">{block.title}</p>
                <p className="mt-2 text-base leading-relaxed text-ink">
                  <Inline text={block.text} />
                </p>
              </aside>
            );
          case "table":
            return (
              <figure key={i} className="-mx-5 sm:mx-0">
                <div className="overflow-x-auto px-5 sm:px-0">
                  <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-snug">
                    <thead>
                      <tr>
                        {block.head.map((cell, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="border-b border-line px-3 py-3 font-medium text-ink first:pl-0"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="align-top">
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="border-b border-line py-3 pr-3 font-medium text-ink">
                                {cell}
                              </th>
                            ) : (
                              <td key={c} className="border-b border-line px-3 py-3 text-muted">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 px-5 text-xs text-muted sm:hidden">Swipe the table to see every column.</p>
                {block.caption && (
                  <figcaption className="mt-3 px-5 text-sm text-muted sm:px-0">{block.caption}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
