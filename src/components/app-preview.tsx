type Screen = { src: string; alt: string; label: string };

export function AppPreview({ screens, liveUrl }: { screens: Screen[]; liveUrl?: string }) {
  if (liveUrl) {
    return (
      <div className="mx-auto w-[min(100%,280px)]">
        <div className="rounded-[2rem] border border-line bg-ink p-2 shadow-frame">
          <div className="overflow-hidden rounded-[1.5rem] bg-paper">
            <iframe
              src={liveUrl}
              title="Trackr app preview"
              className="aspect-[9/16] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-xs tracking-widest text-muted uppercase">Live preview</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:justify-center sm:gap-6">
      {screens.map((screen) => (
        <figure key={screen.src} className="w-[210px] shrink-0 snap-center sm:w-[230px]">
          <div className="rounded-[2rem] border border-line bg-ink p-2 shadow-frame">
            <div className="overflow-hidden rounded-[1.5rem] bg-ink">
              <img src={screen.src} alt={screen.alt} className="aspect-[9/16] w-full object-cover object-top" />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs tracking-widest text-muted uppercase">{screen.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

