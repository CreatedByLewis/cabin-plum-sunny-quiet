import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,scale,border-color] duration-200 ease-out active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-card",
  quiet: "border border-line bg-card text-ink hover:border-ink",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; className?: string };

export function ButtonLink({ variant = "primary", className, ...props }: LinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonAnchor({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
