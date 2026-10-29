import { useState } from "react";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  src: string;
  mobileSrc?: string;
  alt: string;
  url: string;
  hoverSrc?: string;
  className?: string;
};

export function BrowserFrame({ src, mobileSrc, alt, url, hoverSrc, className }: BrowserFrameProps) {
  const [lit, setLit] = useState(false);

  function onTap() {
    if (!hoverSrc) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    setLit((value) => !value);
  }

  return (
    <div
      className={cn("group", lit && "is-lit", className)}
      onClick={onTap}
    >
      <div className="mx-auto w-[min(100%,280px)] md:hidden">
        <Phone src={mobileSrc ?? src} hoverSrc={hoverSrc} url={url} />
      </div>
      <div className="hidden overflow-hidden rounded-xl border border-line bg-card shadow-frame md:block">
        <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
          <span className="size-2 rounded-full bg-muted/40" />
          <span className="size-2 rounded-full bg-muted/40" />
          <span className="size-2 rounded-full bg-muted/40" />
          <span className="ml-2 truncate text-xs text-muted">{url}</span>
          {hoverSrc ? <span className="ml-auto shrink-0 text-[11px] text-muted">Hover for light</span> : null}
        </div>
        <Shot src={src} hoverSrc={hoverSrc} alt={alt} className="aspect-video" />
      </div>
    </div>
  );
}

function Phone({ src, hoverSrc, url }: { src: string; hoverSrc?: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-frame">
      <div className="flex items-center justify-center border-b border-line bg-card px-4 py-2">
        <span className="h-1.5 w-12 rounded-full bg-muted/40" />
      </div>
      <Shot src={src} hoverSrc={hoverSrc} alt="" className="aspect-[9/16]" />
      <p className="truncate px-3 py-2 text-center text-[11px] text-muted">
        {url}
        {hoverSrc ? " · tap for light" : ""}
      </p>
    </div>
  );
}

function Shot({
  src,
  hoverSrc,
  alt,
  className,
}: {
  src: string;
  hoverSrc?: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      {hoverSrc ? (
        <img
          src={hoverSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-lit]:opacity-100"
        />
      ) : null}
    </div>
  );
}
