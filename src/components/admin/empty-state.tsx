"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-cream to-marble border border-gold/30 flex items-center justify-center">
          {Icon ? (
            <Icon className="h-9 w-9 text-gold" />
          ) : (
            <LotusIcon className="h-9 w-9 text-gold" />
          )}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-4 0-7-3-7-7 0 0 3-1 7 3 4-4 7-3 7-3 0 4-3 7-7 7z" />
      <path d="M12 13c0-4-2-7-5-9 0 4 1 7 5 9z" />
      <path d="M12 13c0-4 2-7 5-9 0 4-1 7-5 9z" />
      <path d="M12 13c-2-1-3-3-3-5" />
      <path d="M12 13c2-1 3-3 3-5" />
    </svg>
  );
}
