"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, MapPin, Building2, ImagePlus, X, Upload } from "lucide-react";
import { formatINR, PROJECT_STATUS_LABELS, type Project } from "@/lib/types";

const emptyForm = {
  name: "", slug: "", tagline: "", location: "", city: "Vrindavan",
  totalAreaAcres: 20, minPlotSize: 80, maxPlotSize: 200,
  priceRangeMin: 500000, priceRangeMax: 1000000, status: "selling",
  reraNumber: "", mvdaNumber: "", possessionDate: "", usp: "", description: "",
  longDescription: "", latitude: 27.57, longitude: 77.70,
  amenities: "", heroImage: "/images/projects/bankey-bihari-orchid.png",
  galleryImages: [] as string[],
  isPublished: true, isFeatured: false,
};

export function Projects() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: async () => (await fetch("/api/admin/projects")).json().then((j) => j.data),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const amenities = data.amenities ? data.amenities.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
      const body = { ...data, amenities, totalAreaAcres: Number(data.totalAreaAcres), minPlotSize: Number(data.minPlotSize), maxPlotSize: Number(data.maxPlotSize), priceRangeMin: Number(data.priceRangeMin), priceRangeMax: Number(data.priceRangeMax), latitude: Number(data.latitude), longitude: Number(data.longitude) };
      if (editing) {
        await fetch(`/api/admin/projects/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } else {
        await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Project updated 🙏 — Live site updated!" : "Project created 🎉 — Live site updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project-detail"] });
      queryClient.invalidateQueries({ queryKey: ["project-page"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["blog-preview"] });
      setShowForm(false);
      setEditing(null);
    },
    onError: () => toast.error("Failed to save project"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      toast.success("Project deleted — Live site updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project-detail"] });
      queryClient.invalidateQueries({ queryKey: ["project-page"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setDeleteId(null);
    },
  });

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      ...p,
      amenities: Array.isArray(p.amenities) ? p.amenities.join(", ") : "",
      galleryImages: Array.isArray(p.galleryImages) ? [...p.galleryImages] : [],
      nearbyTemples: undefined,
    });
    setShowForm(true);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {projects.length} townships · Manage your premium properties
        </p>
        <Button onClick={openCreate} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Card key={i} className="card-luxury animate-pulse h-40" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => {
            const status = PROJECT_STATUS_LABELS[p.status] || PROJECT_STATUS_LABELS.selling;
            return (
              <Card key={p.id} className="card-luxury rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-indigo-deep truncate">{p.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gold" /> {p.location}
                      </p>
                    </div>
                    <Badge className={status.color + " border-0"}>{status.label}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                    <div><div className="text-muted-foreground">Area</div><div className="font-semibold text-indigo-deep">{p.totalAreaAcres} acres</div></div>
                    <div><div className="text-muted-foreground">Plot Size</div><div className="font-semibold text-indigo-deep">{p.minPlotSize}-{p.maxPlotSize} sq.yd</div></div>
                    <div><div className="text-muted-foreground">Price</div><div className="font-semibold text-gold">{formatINR(p.priceRangeMin)} - {formatINR(p.priceRangeMax)}</div></div>
                    <div><div className="text-muted-foreground">MVDA</div><div className="font-mono text-[10px] text-indigo-deep truncate">{p.mvdaNumber || "—"}</div></div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gold/10">
                    <Button size="sm" variant="outline" className="flex-1 border-gold/30 text-indigo-deep hover:bg-gold/10" onClick={() => openEdit(p)}>
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-temple-red/30 text-temple-red hover:bg-temple-red/10" onClick={() => setDeleteId(p.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Form dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto scroll-luxury bg-cream">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-indigo-deep flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gold" /> {editing ? "Edit Project" : "New Project"}
            </DialogTitle>
            <DialogDescription>{editing ? "Update township details" : "Add a new premium township"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div><Label className="text-xs">Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">City</Label>
              <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                <SelectTrigger className="bg-white border-gold/25 mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Vrindavan">Vrindavan</SelectItem><SelectItem value="Mathura">Mathura</SelectItem><SelectItem value="Govardhan">Govardhan</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Total Area (acres)</Label><Input type="number" value={form.totalAreaAcres} onChange={(e) => setForm({ ...form, totalAreaAcres: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-white border-gold/25 mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="selling">Selling</SelectItem><SelectItem value="pre-launch">Pre-Launch</SelectItem><SelectItem value="sold-out">Sold Out</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Min Plot Size (sq.yd)</Label><Input type="number" value={form.minPlotSize} onChange={(e) => setForm({ ...form, minPlotSize: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Max Plot Size (sq.yd)</Label><Input type="number" value={form.maxPlotSize} onChange={(e) => setForm({ ...form, maxPlotSize: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Min Price (₹)</Label><Input type="number" value={form.priceRangeMin} onChange={(e) => setForm({ ...form, priceRangeMin: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Max Price (₹)</Label><Input type="number" value={form.priceRangeMax} onChange={(e) => setForm({ ...form, priceRangeMax: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">RERA Number</Label><Input value={form.reraNumber} onChange={(e) => setForm({ ...form, reraNumber: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">MVDA Number</Label><Input value={form.mvdaNumber} onChange={(e) => setForm({ ...form, mvdaNumber: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Possession Date</Label><Input value={form.possessionDate || ""} onChange={(e) => setForm({ ...form, possessionDate: e.target.value })} placeholder="e.g., Dec 2027" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Latitude (for Google Map)</Label><Input type="number" step="0.0000001" value={form.latitude || 0} onChange={(e) => setForm({ ...form, latitude: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Longitude (for Google Map)</Label><Input type="number" step="0.0000001" value={form.longitude || 0} onChange={(e) => setForm({ ...form, longitude: e.target.value })} className="bg-white border-gold/25 mt-1" /></div>
            <div className="sm:col-span-2"><Label className="text-xs">Hero Image URL (main project photo)</Label><Input value={form.heroImage || ""} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} placeholder="/images/projects/..." className="bg-white border-gold/25 mt-1 font-mono text-xs" /></div>

            {/* Gallery Images Section */}
            <div className="sm:col-span-2">
              <Label className="text-xs flex items-center gap-1.5"><ImagePlus className="w-3.5 h-3.5 text-gold" /> Gallery Images (shown on project detail page slider)</Label>
              <div className="mt-2 space-y-2">
                {/* Existing gallery images */}
                {form.galleryImages && form.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {form.galleryImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-gold/20 bg-marble">
                        <div className="aspect-video bg-marble relative">
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        </div>
                        <div className="absolute top-1 left-1 bg-indigo-deep/80 text-cream text-[9px] px-1.5 py-0.5 rounded font-mono">{idx + 1}</div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (idx > 0) {
                                const updated = [...form.galleryImages];
                                [updated[idx], updated[idx - 1]] = [updated[idx - 1], updated[idx]];
                                setForm({ ...form, galleryImages: updated });
                              }
                            }}
                            className="flex-1 text-center text-[10px] py-1 bg-cream/80 hover:bg-cream text-indigo-deep font-medium transition-colors"
                            disabled={idx === 0}
                          >← Move</button>
                          <button
                            type="button"
                            onClick={() => {
                                if (idx < form.galleryImages.length - 1) {
                                  const updated = [...form.galleryImages];
                                  [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
                                  setForm({ ...form, galleryImages: updated });
                                }
                              }}
                            className="flex-1 text-center text-[10px] py-1 bg-cream/80 hover:bg-cream text-indigo-deep font-medium transition-colors"
                            disabled={idx === form.galleryImages.length - 1}
                          >Move →</button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, galleryImages: form.galleryImages.filter((_: string, i: number) => i !== idx) })}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-temple-red/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-temple-red"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new gallery image */}
                <div className="flex gap-2">
                  <Input
                    value={form._newGalleryUrl || ""}
                    onChange={(e) => setForm({ ...form, _newGalleryUrl: e.target.value })}
                    placeholder="Paste image URL or /uploads/media/..."
                    className="flex-1 bg-white border-gold/25 font-mono text-xs h-9"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-indigo-deep hover:bg-gold/10 h-9"
                    onClick={() => {
                      const url = (form as any)._newGalleryUrl?.trim();
                      if (url) {
                        setForm({ ...form, galleryImages: [...(form.galleryImages || []), url], _newGalleryUrl: "" });
                      }
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-indigo-deep hover:bg-gold/10 h-9"
                    onClick={async () => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = async (e: any) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }
                        const fd = new FormData();
                        fd.append("file", file);
                        try {
                          const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
                          const json = await res.json();
                          if (json.ok) {
                            setForm({ ...form, galleryImages: [...(form.galleryImages || []), json.data.url] });
                            toast.success("Image uploaded");
                          } else { toast.error(json.error || "Upload failed"); }
                        } catch { toast.error("Upload failed"); }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="w-3.5 h-3.5 mr-1" /> Upload
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Add multiple images — they appear in the project detail page slider. First image = main hero.</p>
              </div>
            </div>
            <div className="sm:col-span-2"><Label className="text-xs">Amenities (comma-separated — each word editable)</Label><Input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="Temple Complex, Community Hall, ..." className="bg-white border-gold/25 mt-1" /></div>
            <div className="sm:col-span-2"><Label className="text-xs">USP (Unique Selling Proposition — shown on project page)</Label><Textarea value={form.usp || ""} onChange={(e) => setForm({ ...form, usp: e.target.value })} className="bg-white border-gold/25 mt-1 min-h-[60px]" /></div>
            <div className="sm:col-span-2"><Label className="text-xs">Short Description (for project cards)</Label><Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-white border-gold/25 mt-1 min-h-[60px]" /></div>
            <div className="sm:col-span-2"><Label className="text-xs">Long Description (for detailed project page — full text)</Label><Textarea value={form.longDescription || ""} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} placeholder="Full detailed description shown on the separate project page..." className="bg-white border-gold/25 mt-1 min-h-[120px]" /></div>
            <div className="sm:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.isPublished ?? true} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="accent-gold" /> Published (visible on site)</label>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.isFeatured ?? false} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /> Featured (badge on card)</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
              {saveMutation.isPending ? "Saving..." : "Save Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="bg-cream">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-indigo-deep">Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the project and all its plots. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)} className="bg-temple-red text-cream hover:bg-temple-red/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
