"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndContext, type DragEndEvent, useDraggable, useDroppable, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Phone, Mail, MessageCircle, Clock, LayoutGrid, List, Trash2 } from "lucide-react";
import { LEAD_STAGES, type Lead } from "@/lib/types";

function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-cream rounded-lg p-3 border border-gold/15 cursor-pointer hover:border-gold/40 hover:shadow-md transition-all mb-2"
    >
      <div className="flex items-start justify-between gap-1.5 mb-1.5">
        <div className="min-w-0">
          <div className="font-medium text-sm text-indigo-deep truncate">{lead.name}</div>
          <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
            <Phone className="w-2.5 h-2.5" /> {lead.phone}
          </div>
        </div>
        <div className="text-[11px] font-bold text-gold">{lead.score}</div>
      </div>
      {lead.project?.name && (
        <Badge variant="outline" className="text-[10px] mb-1.5 border-gold/30 text-gold">{lead.project.name}</Badge>
      )}
      <div className="h-1 rounded-full bg-marble overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gold-light to-gold" style={{ width: `${lead.score}%` }} />
      </div>
      <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
        <span className="capitalize">{lead.source}</span>
        <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
      </div>
    </div>
  );
}

export function Leads() {
  const queryClient = useQueryClient();
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => (await fetch("/api/leads")).json().then((j) => j.data),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await fetch(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await fetch(`/api/admin/leads/${id}`, { method: "DELETE" }); },
    onSuccess: () => {
      toast.success("Lead deleted");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setSelected(null);
    },
  });

  const onDragEnd = (e: DragEndEvent) => {
    const leadId = e.active.id as string;
    const newStage = e.over?.id as string;
    if (!newStage) return;
    const lead = leads.find((l) => l.id === leadId);
    if (lead && lead.stage !== newStage) {
      updateMutation.mutate({ id: leadId, data: { stage: newStage } });
      toast.success(`${lead.name} → ${LEAD_STAGES.find(s => s.id === newStage)?.label}`);
    }
  };

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setNotes(lead.notes || "");
    setScore(lead.score);
  };

  const saveDetail = () => {
    if (!selected) return;
    updateMutation.mutate({ id: selected.id, data: { notes, score, lastContactedAt: new Date().toISOString() } });
    toast.success("Lead updated 🙏");
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{leads.length} leads · Drag cards to update stage</p>
        <div className="flex gap-1 p-1 bg-marble rounded-lg">
          <button onClick={() => setView("kanban")} className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 ${view === "kanban" ? "bg-cream text-gold shadow" : "text-muted-foreground"}`}>
            <LayoutGrid className="w-3.5 h-3.5" /> Kanban
          </button>
          <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 ${view === "list" ? "bg-cream text-gold shadow" : "text-muted-foreground"}`}>
            <List className="w-3.5 h-3.5" /> List
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
      ) : view === "kanban" ? (
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {LEAD_STAGES.map((stage) => {
              const stageLeads = leads.filter((l) => l.stage === stage.id);
              return (
                <DroppableColumn key={stage.id} stage={stage} count={stageLeads.length}>
                  {stageLeads.map((lead) => (
                    <DraggableCard key={lead.id} id={lead.id}>
                      <LeadCard lead={lead} onClick={() => openDetail(lead)} />
                    </DraggableCard>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="text-center text-[11px] text-muted-foreground/50 py-4 border-2 border-dashed border-gold/10 rounded-lg">Drop here</div>
                  )}
                </DroppableColumn>
              );
            })}
          </div>
        </DndContext>
      ) : (
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-marble">
                  <tr className="text-left text-xs text-muted-foreground border-b border-gold/15">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium">Score</th>
                    <th className="px-4 py-3 font-medium">Stage</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const stage = LEAD_STAGES.find((s) => s.id === lead.stage);
                    return (
                      <tr key={lead.id} onClick={() => openDetail(lead)} className="border-b border-gold/8 hover:bg-gold/5 cursor-pointer">
                        <td className="px-4 py-3 font-medium text-indigo-deep">{lead.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                        <td className="px-4 py-3 text-muted-foreground">{lead.project?.name || "—"}</td>
                        <td className="px-4 py-3 capitalize text-xs">{lead.source}</td>
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 rounded-full bg-marble overflow-hidden"><div className="h-full bg-gold" style={{ width: `${lead.score}%` }} /></div><span className="text-xs font-semibold text-gold">{lead.score}</span></div></td>
                        <td className="px-4 py-3"><span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${stage?.color || "bg-gray-500"}`}>{stage?.label}</span></td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md bg-cream overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-xl font-bold text-indigo-deep">{selected.name}</SheetTitle>
                <SheetDescription>Lead details and notes</SheetDescription>
              </SheetHeader>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gold/15 text-sm"><Phone className="w-4 h-4 text-gold" /> {selected.phone}</a>
                  {selected.email && <a href={`mailto:${selected.email}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gold/15 text-sm truncate"><Mail className="w-4 h-4 text-gold" /> {selected.email}</a>}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-white border border-gold/15"><div className="text-xs text-muted-foreground">Project</div><div className="font-medium text-indigo-deep">{selected.project?.name || "General"}</div></div>
                  <div className="p-3 rounded-lg bg-white border border-gold/15"><div className="text-xs text-muted-foreground">Source</div><div className="font-medium text-indigo-deep capitalize">{selected.source}</div></div>
                  <div className="p-3 rounded-lg bg-white border border-gold/15"><div className="text-xs text-muted-foreground">Budget</div><div className="font-medium text-indigo-deep">{selected.budgetRange || "—"}</div></div>
                  <div className="p-3 rounded-lg bg-white border border-gold/15"><div className="text-xs text-muted-foreground">Stage</div><div className="font-medium text-gold capitalize">{selected.stage}</div></div>
                </div>
                <div>
                  <label className="text-xs font-medium text-indigo-deep mb-2 block">Lead Score: <span className="text-gold font-bold">{score}</span></label>
                  <Slider value={[score]} onValueChange={(v) => setScore(v[0])} min={0} max={100} step={5} />
                </div>
                <div>
                  <label className="text-xs font-medium text-indigo-deep mb-2 block">Notes</label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add conversation notes..." className="bg-white border-gold/25 min-h-[120px]" />
                </div>
                <div className="flex gap-2">
                  <a href={`https://wa.me/91${selected.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851]">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <Button onClick={saveDetail} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">Save</Button>
                  <Button variant="outline" onClick={() => deleteMutation.mutate(selected.id)} className="border-temple-red/30 text-temple-red hover:bg-temple-red/10"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DraggableCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, opacity: isDragging ? 0.6 : 1, zIndex: isDragging ? 50 : 1 } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>{children}</div>
  );
}

function DroppableColumn({ stage, count, children }: { stage: { id: string; label: string; color: string }; count: number; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  return (
    <div ref={setNodeRef} className={`rounded-xl p-2 min-h-[200px] transition-colors ${isOver ? "bg-gold/10" : "bg-marble/50"}`}>
      <div className="flex items-center justify-between px-2 py-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${stage.color}`} />
          <span className="text-xs font-semibold text-indigo-deep uppercase tracking-wide">{stage.label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{count}</span>
      </div>
      {children}
    </div>
  );
}
