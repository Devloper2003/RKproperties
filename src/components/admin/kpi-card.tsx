"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; positive: boolean };
  hint?: string;
  accent?: "gold" | "green" | "temple" | "indigo";
}

const ACCENT_MAP: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  gold: "from-gold/15 to-gold/0 text-gold border-gold/30",
  green: "from-green-light/15 to-green-light/0 text-green-light border-green-light/30",
  temple: "from-temple-red/15 to-temple-red/0 text-temple-red border-temple-red/30",
  indigo: "from-indigo-deep/15 to-indigo-deep/0 text-indigo-deep border-indigo-deep/30",
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  accent = "gold",
}: KpiCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-5 border bg-gradient-to-br rounded-xl transition-all hover:shadow-lg",
        ACCENT_MAP[accent]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="font-display text-3xl font-bold text-foreground tabular-nums">
            {value}
          </p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg bg-background/60 shadow-sm"
          )}
        >
          <Icon className={cn("h-5 w-5", ACCENT_MAP[accent].split(" ").find((c) => c.startsWith("text-")))} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              trend.positive ? "text-green-light" : "text-temple-red"
            )}
          >
            {trend.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </Card>
  );
}
