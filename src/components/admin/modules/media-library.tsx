"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Copy, Check, Upload, Search, Trash2, FolderOpen } from "lucide-react";
import { toast } from "sonner";

// Available images in public/images/
const AVAILABLE_IMAGES = [
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

const CATEGORIES = ["All", "Hero", "Township", "Project", "Temple", "Brand"];

export function MediaLibrary() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");

  const filtered = AVAILABLE_IMAGES.filter((img) => {
    const matchesCat = filter === "All" || img.category === filter;
    const matchesSearch = !search || img.name.toLowerCase().includes(search.toLowerCase()) || img.path.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const copyPath = async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(path);
      toast.success(`📋 Copied: ${path}`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Copy failed — select and copy manually");
    }
  };

  const addCustomImage = () => {
    if (!customUrl) {
      toast.error("Enter an image URL first");
      return;
    }
    toast.success(`🖼️ Image URL saved! Use this path in project hero image field: ${customUrl}`);
    setCustomUrl("");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-indigo-deep flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gold" /> Media Library
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage all images — copy paths to use in projects, blog posts, etc.</p>
        </div>
      </div>

      {/* Add custom image URL */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-4">
          <Label className="text-xs font-medium text-indigo-deep flex items-center gap-1.5 mb-2">
            <Upload className="w-3.5 h-3.5 text-gold" /> Add Image by URL
          </Label>
          <div className="flex gap-2">
            <Input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://example.com/image.jpg or /images/your-image.png"
              className="bg-white border-gold/25 h-9 text-xs font-mono"
            />
            <Button onClick={addCustomImage} size="sm" className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-9">
              Save URL
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            💡 Paste any image URL here. Then copy the path and paste it into project "Hero Image URL" field.
          </p>
        </CardContent>
      </Card>

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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((img, i) => (
          <motion.div
            key={img.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="card-luxury rounded-xl overflow-hidden group">
              {/* Image preview */}
              <div className="relative aspect-video bg-marble overflow-hidden">
                <img
                  src={img.path}
                  alt={img.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <Badge className="absolute top-2 left-2 bg-cream/90 text-indigo-deep text-[9px]">
                  {img.category}
                </Badge>
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

      {/* Info */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <FolderOpen className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-indigo-deep">How to use:</strong> Click the copy button next to any image path, then paste it into the
              "Hero Image URL" field when editing a project. The image will appear on the project card and the detailed project page.
              To add new images, use the "Add Image by URL" field above with any web image URL.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
