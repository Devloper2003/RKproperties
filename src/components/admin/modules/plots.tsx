"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Grid3x3, Search } from "lucide-react";
import { formatINRFull, PLOT_STATUS_CONFIG, type Plot, type Project } from "@/lib/types";

const FACINGS = ["north", "south", "east", "west", "ne", "nw", "se", "sw"];

export function Plots() {
  const queryClient = useQueryClient();
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ projectId: "", plotNumber: "", sizeSqyd: 100, facing: "north", dimensions: "20x30", price: 500000, status: "available", isCorner: false, isRoadFacing: false });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  const activeProjectId = projectFilter === "all" ? "" : projects.find((p) => p.slug === projectFilter)?.id || "";

  const { data: plots = [], isLoading } = useQuery<Plot[]>({
    queryKey: ["admin-plots", activeProjectId, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeProjectId) params.set("projectId", activeProjectId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/plots?${params}`);
      return res.json().then((j) => j.data);
    },
  });

  const filteredPlots = plots.filter((p) =>
    !search || p.plotNumber.toLowerCase().includes(search.toLowerCase())
  );

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await fetch(`/api/plots/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    },
    onSuccess: () => {
      toast.success("Plot status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-plots"] });
      queryClient.invalidateQueries({ queryKey: ["plots"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      await fetch("/api/admin/plots", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, sizeSqyd: Number(data.sizeSqyd), price: Number(data.price) }) });
    },
    onSuccess: () => {
      toast.success("Plot added 🎉");
      queryClient.invalidateQueries({ queryKey: ["admin-plots"] });
      queryClient.invalidateQueries({ queryKey: ["plots"] });
      setShowAdd(false);
      setForm({ projectId: "", plotNumber: "", sizeSqyd: 100, facing: "north", dimensions: "20x30", price: 500000, status: "available", isCorner: false, isRoadFacing: false });
    },
    onError: () => toast.error("Failed to add plot"),
  });

  const statusCounts: Record<string, number> = { available: 0, reserved: 0, booked: 0, sold: 0 };
  filteredPlots.forEach((p) => (statusCounts[p.status] = (statusCounts[p.status] || 0) + 1));

  return (
    <div className="space-y-5">
      {/* Stats + filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => {
          const cfg = PLOT_STATUS_CONFIG[status];
          return (
            <Card key={status} className="card-luxury rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{cfg.label}</div>
                  <div className={`font-display text-2xl font-bold ${cfg.color}`}>{count}</div>
                </div>
                <div className={`w-9 h-9 rounded-lg ${cfg.bg} opacity-80`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="card-luxury rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-deep">
              <Grid3x3 className="w-4 h-4 text-gold" /> {filteredPlots.length} plots
            </div>
            <div className="flex flex-1 flex-col sm:flex-row gap-2 sm:ml-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search plot no..." className="pl-9 bg-white border-gold/25 h-9 text-sm" />
              </div>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="bg-white border-gold/25 h-9 text-sm w-full sm:w-44"><SelectValue placeholder="Project" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Projects</SelectItem>{projects.map((p) => <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-gold/25 h-9 text-sm w-full sm:w-36 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Status</SelectItem>{Object.entries(PLOT_STATUS_CONFIG).map(([k, v]) => <SelectItem key={k} value={k} className="capitalize">{v.label}</SelectItem>)}</SelectContent>
              </Select>
              <Button onClick={() => setShowAdd(true)} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-9">
                <Plus className="w-4 h-4 mr-1" /> Add Plot
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto scroll-luxury">
            <table className="w-full text-sm">
              <thead className="bg-marble">
                <tr className="text-left text-xs text-muted-foreground border-b border-gold/15">
                  <th className="px-4 py-3 font-medium">Plot No.</th>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Facing</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Flags</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={7} className="text-center py-10 text-muted-foreground">Loading plots...</td></tr>
                ) : filteredPlots.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-10 text-muted-foreground">No plots match filters</td></tr>
                ) : (
                  filteredPlots.slice(0, 100).map((plot) => {
                    const cfg = PLOT_STATUS_CONFIG[plot.status];
                    return (
                      <tr key={plot.id} className="border-b border-gold/8 hover:bg-gold/5">
                        <td className="px-4 py-3 font-mono font-bold text-indigo-deep">{plot.plotNumber}</td>
                        <td className="px-4 py-3 text-muted-foreground">{plot.project?.name || "—"}</td>
                        <td className="px-4 py-3">{plot.sizeSqyd} sq.yd</td>
                        <td className="px-4 py-3 uppercase text-xs">{plot.facing}</td>
                        <td className="px-4 py-3 font-semibold text-gold">{formatINRFull(plot.price)}</td>
                        <td className="px-4 py-3 text-xs">
                          {plot.isCorner && <span className="text-gold mr-1" title="Corner">★</span>}
                          {plot.isRoadFacing && <span className="text-green-deep" title="Road facing">🛣️</span>}
                        </td>
                        <td className="px-4 py-3">
                          <Select value={plot.status} onValueChange={(v) => statusMutation.mutate({ id: plot.id, status: v })}>
                            <SelectTrigger className="h-7 w-28 text-xs border-0 bg-transparent hover:bg-gold/10">
                              <span className={`flex items-center gap-1.5 ${cfg.color}`}><span className={`w-2 h-2 rounded-full ${cfg.bg}`} />{cfg.label}</span>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(PLOT_STATUS_CONFIG).map(([k, v]) => (
                                <SelectItem key={k} value={k} className="capitalize">{v.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {filteredPlots.length > 100 && (
            <div className="p-3 text-center text-xs text-muted-foreground border-t border-gold/10">
              Showing first 100 of {filteredPlots.length} plots. Refine filters to see more.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add plot dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md bg-cream">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold text-indigo-deep">Add New Plot</DialogTitle>
            <DialogDescription>Create a new plot in inventory</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label className="text-xs">Project *</Label>
              <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
                <SelectTrigger className="bg-white border-gold/25 mt-1"><SelectValue placeholder="Select project" /></SelectTrigger>
                <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Plot Number *</Label><Input value={form.plotNumber} onChange={(e) => setForm({ ...form, plotNumber: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Size (sq.yd)</Label><Input type="number" value={form.sizeSqyd} onChange={(e) => setForm({ ...form, sizeSqyd: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Facing</Label>
                <Select value={form.facing} onValueChange={(v) => setForm({ ...form, facing: v })}>
                  <SelectTrigger className="bg-white border-gold/25 mt-1 capitalize"><SelectValue /></SelectTrigger>
                  <SelectContent>{FACINGS.map((f) => <SelectItem key={f} value={f} className="capitalize">{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-xs">Dimensions</Label><Input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-white border-gold/25 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.entries(PLOT_STATUS_CONFIG).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isCorner} onChange={(e) => setForm({ ...form, isCorner: e.target.checked })} className="accent-gold" /> Corner Plot</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isRoadFacing} onChange={(e) => setForm({ ...form, isRoadFacing: e.target.checked })} className="accent-gold" /> Road Facing</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => addMutation.mutate(form)} disabled={addMutation.isPending || !form.projectId || !form.plotNumber} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
              {addMutation.isPending ? "Adding..." : "Add Plot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
