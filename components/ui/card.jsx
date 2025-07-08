import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return <div data-slot="card" className={cn("bg-card dark:!bg-transparent text-card-foreground flex flex-col gap-6 rounded-xl border py-6 ", className)} {...props} />;
}

function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

function CardDescription({ className, ...props }) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function CardAction({ className, ...props }) {
  return <div data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />;
}

const CardDecorator = ({ children }) => (
  <div
    className="relative mx-auto size-36 duration-300 ease-in-out 
    group-hover:duration-300 
    [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] 
    group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)50%,transparent)] 
    dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] 
    dark:group-hover:bg-white/8 
    dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)] 
    transition-[background,box-shadow,border-color]"
  >
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] transition-opacity duration-300"
    />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75% transition-opacity duration-300" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t transition-all duration-300">{children}</div>
  </div>
);

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, CardDecorator };
