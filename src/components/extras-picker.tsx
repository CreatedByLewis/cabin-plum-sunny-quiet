import { extrasFor, formatGBP, type ExtraId, type PackageId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ExtrasPicker({
  packageId,
  selected,
  onToggle,
}: {
  packageId: PackageId;
  selected: ExtraId[];
  onToggle: (id: ExtraId) => void;
}) {
  const available = extrasFor(packageId);
  if (available.length === 0) {
    return null;
  }

  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">After launch</legend>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Partner is optional. Six months, £150 a month. It covers the running of the site, not a second build.
      </p>
      <ul className="mt-3 space-y-2">
        {available.map((item) => {
          const on = selected.includes(item.id);
          return (
            <li key={item.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-start justify-between gap-4 rounded-lg border px-4 py-3",
                  on ? "border-ink bg-card" : "border-line",
                )}
              >
                <span className="flex gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 accent-current"
                    checked={on}
                    onChange={() => onToggle(item.id)}
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.name}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted">{item.detail}</span>
                  </span>
                </span>
                <span className="shrink-0 text-sm text-ink tabular-nums">
                  {item.monthly ? `${formatGBP(item.price)}/mo` : formatGBP(item.price)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
