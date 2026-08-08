"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Copy, Check, Upload, Search, Trash2, FolderOpen, X, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Static images bundled in public/images/
const BUNDLED_IMAGES = [
  { path: "/images/hero-vrindavan.png", name: "Hero - Vrindavan Dawn", category: "Hero" },
  { path: "/images/township-aerial.png", name: "Township Aerial View", category: "Township" },
  { path: "/images/projects/bankey-bihari-orchid.png", name: "Bankey Bihari Orchid", category: "Project" },
  { path: "/images/projects/braj-lotus-greens.png", name: "Braj Lotus Greens", category: "Project" },
  { path: "/images/projects/bankey-bihari-kunj.png", name: "Bankey Bihari Kunj", category: "Project" },
  { path: "/images/projects/bankey-bihari-dham.png", name: "Bankey Bihari Dham", category: "Project" },
  { path: "/images/temples/banke-bihari.png", name: "Banke Bihari Temple", category: "Temple" },
  { path: "/images/temples/govardhan.png", name: "Govardhan Hill", category: "Temple" },
  { path: "/images/temples/iskcon.png", name: "ISKCON Temple", category: "Temple" },
  { path: "/images/rk-logo.png", name: "RK Properties Logo", category: "Brand" },
];

const CATEGORIES = ["All", "Uploaded", "URL", "Hero", "Township", "Project", "Temple", "Brand"];

type UploadedImage = { url: string; filename: string; size: number; createdAt: string };

type UrlImage = { path: string; name: string; category: string };

export function MediaLibrary() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [urlImages, setUrlImages] = useState<UrlImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load URL images from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rk_media_urls");
      if (saved) setUrlImages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Fetch uploaded images from server
  const fetchUploaded = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      if (json.ok) setUploadedImages(json.data || []);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchUploaded(); }, [fetchUploaded]);

  // Build combined list
  const allImages = [
    ...uploadedImages.map((img) => ({ path: img.url, name: img.filename, category: "Uploaded" })),
    ...urlImages,
    ...BUNDLED_IMAGES,
  ];

  const filtered = allImages.filter((img) => {
    const matchesCat = filter === "All" || img.category === filter;
    const matchesSearch = !search || img.name.toLowerCase().includes(search.toLowerCase()) || img.path.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const copyPath = async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(path);
      toast.success(`Copied: ${path}`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  // Save URL to localStorage
  const addUrlImage = () => {
    if (!customUrl) { toast.error("Enter an image URL first"); return; }
    const newImg: UrlImage = {
      path: customUrl,
      name: customName || customUrl.split("/").pop() || "Custom Image",
      category: "URL",
    };
    const updated = [newImg, ...urlImages];
    setUrlImages(updated);
    localStorage.setItem("rk_media_urls", JSON.stringify(updated));
    toast.success(`Image URL saved: ${newImg.name}`);
    setCustomUrl("");
    setCustomName("");
  };

  // Remove a URL image
  const removeUrlImage = (path: string) => {
    const updated = urlImages.filter((u) => u.path !== path);
    setUrlImages(updated);
    localStorage.setItem("rk_media_urls", JSON.stringify(updated));
    toast.success("URL image removed");
  };

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json.ok) {
        toast.success(`Uploaded: ${json.data.filename}`);
        fetchUploaded();
      } else {
        toast.error(json.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Delete uploaded image
  const deleteUploaded = async (filename: string) => {
    if (!confirm(`Delete "${filename}"?`)) return;
    try {
      const res = await fetch(`/api/admin/media/${filename}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        toast.success("Image deleted");
        fetchUploaded();
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-indigo-deep flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gold" /> Media Library
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Upload images, add URLs, or copy paths for projects & blogs</p>
        </div>
      </div>

      {/* Upload + URL Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* File Upload Card */}
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-4">
            <Label className="text-xs font-medium text-indigo-deep flex items-center gap-1.5 mb-2">
              <ImagePlus className="w-3.5 h-3.5 text-gold" /> Upload Image
            </Label>
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                uploading ? "border-gold/30 bg-gold/5" : "border-gold/20 hover:border-gold/50 hover:bg-gold/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 text-gold animate-spin" />
                  <span className="text-xs text-muted-foreground">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gold" />
                  <span className="text-xs font-medium text-indigo-deep">Click to upload image</span>
                  <span className="text-[10px] text-muted-foreground">JPG, PNG, WebP, GIF, SVG — Max 5MB</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* URL Input Card */}
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-4">
            <Label className="text-xs font-medium text-indigo-deep flex items-center gap-1.5 mb-2">
              <Upload className="w-3.5 h-3.5 text-gold" /> Add Image by URL
            </Label>
            <div className="space-y-2">
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Image name (optional)"
                className="bg-white border-gold/25 h-9 text-xs"
              />
              <Input
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-white border-gold/25 h-9 text-xs font-mono"
              />
              <Button onClick={addUrlImage} size="sm" className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-9">
                Save URL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="pl-9 bg-white border-gold/25 h-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === cat ? "bg-gold text-indigo-deep" : "bg-white border border-gold/20 text-indigo-deep hover:border-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Loading media...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="card-luxury rounded-xl overflow-hidden group">
                <div className="relative aspect-video bg-marble overflow-hidden">
                  <img
                    src={img.path}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/rk-logo.png"; }}
                  />
                  <Badge className="absolute top-2 left-2 bg-cream/90 text-indigo-deep text-[9px]">
                    {img.category}
                  </Badge>
                  {/* Delete button for uploaded & URL images */}
                  {(img.category === "Uploaded" || img.category === "URL") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (img.category === "Uploaded") {
                          deleteUploaded(img.path.split("/").pop()!);
                        } else {
                          removeUrlImage(img.path);
                        }
                      }}
                      className="absolute top-2 right-2 p-1 rounded bg-temple-red/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-temple-red"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="text-xs font-medium text-indigo-deep truncate mb-1">{img.name}</div>
                  <div className="flex items-center gap-1">
                    <code className="text-[10px] text-muted-foreground font-mono truncate flex-1 bg-marble px-1.5 py-0.5 rounded">
                      {img.path}
                    </code>
                    <button
                      onClick={() => copyPath(img.path)}
                      className="p-1 rounded text-gold hover:bg-gold/10 flex-shrink-0"
                      aria-label="Copy path"
                    >
                      {copied === img.path ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground text-sm">No images found</div>
      )}

      {/* Info */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <FolderOpen className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-indigo-deep">How to use:</strong> Upload images or add URLs. Click the copy button to copy the path, then paste it
              into the "Hero Image URL" field when editing a project. Uploaded images are saved to <code className="bg-marble px-1 rounded">/public/uploads/media/</code>.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
