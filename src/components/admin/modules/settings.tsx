"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Phone, Search, CreditCard, Users, History, Save, Plus, Trash2, Pencil, X } from "lucide-react";

export function Settings() {
  const save = (section: string) => toast.success(`✓ ${section} settings saved`);

  return (
    <Tabs defaultValue="general">
      <TabsList className="bg-marble flex-wrap h-auto">
        <TabsTrigger value="general" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Building2 className="w-3.5 h-3.5 mr-1.5" /> General</TabsTrigger>
        <TabsTrigger value="contact" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Phone className="w-3.5 h-3.5 mr-1.5" /> Contact</TabsTrigger>
        <TabsTrigger value="seo" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Search className="w-3.5 h-3.5 mr-1.5" /> SEO</TabsTrigger>
        <TabsTrigger value="payment" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><CreditCard className="w-3.5 h-3.5 mr-1.5" /> Payment</TabsTrigger>
        <TabsTrigger value="users" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Users className="w-3.5 h-3.5 mr-1.5" /> Users</TabsTrigger>
        <TabsTrigger value="audit" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><History className="w-3.5 h-3.5 mr-1.5" /> Audit Log</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-4">
        <Card className="card-luxury rounded-xl"><CardContent className="p-6 space-y-4 max-w-2xl">
          <h3 className="font-display text-lg font-bold text-indigo-deep">General Settings</h3>
          <div><Label className="text-xs">Site Name</Label><Input defaultValue="RK Properties" className="bg-white border-gold/25 mt-1" /></div>
          <div><Label className="text-xs">Tagline</Label><Input defaultValue="Your Spiritual Home in Braj Dham" className="bg-white border-gold/25 mt-1" /></div>
          <div><Label className="text-xs">Description</Label><Textarea defaultValue="Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan." className="bg-white border-gold/25 mt-1 min-h-[80px]" /></div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-marble">
            <div><div className="text-sm font-medium text-indigo-deep">Maintenance Mode</div><div className="text-xs text-muted-foreground">Temporarily disable public site</div></div>
            <Switch />
          </div>
          <Button onClick={() => save("General")} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </CardContent></Card>
      </TabsContent>

      <TabsContent value="contact" className="mt-4">
        <Card className="card-luxury rounded-xl"><CardContent className="p-6 space-y-4 max-w-2xl">
          <h3 className="font-display text-lg font-bold text-indigo-deep">Contact Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs">Primary Phone</Label><Input defaultValue="+91 89239 44689" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">WhatsApp Number</Label><Input defaultValue="918923944689" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Primary Email</Label><Input defaultValue="shailendrrachaudhary@gmail.com" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Support Email</Label><Input defaultValue="shailendrrachaudhary@gmail.com" className="bg-white border-gold/25 mt-1" /></div>
          </div>
          <div><Label className="text-xs">Office Address</Label><Textarea defaultValue="Mathura - Vrindavan Marg, In front of Kailash Nagar Road,
                     Near ATTLA CHUNGI, Vatsalya Gram, Mathura, UP 281121" className="bg-white border-gold/25 mt-1 min-h-[60px]" /></div>
          <Button onClick={() => save("Contact")} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </CardContent></Card>
      </TabsContent>

      <TabsContent value="seo" className="mt-4">
        <Card className="card-luxury rounded-xl"><CardContent className="p-6 space-y-4 max-w-2xl">
          <h3 className="font-display text-lg font-bold text-indigo-deep">SEO Defaults</h3>
          <div><Label className="text-xs">Default Meta Title</Label><Input defaultValue="RK Properties — Premium Plots in Braj Dham" className="bg-white border-gold/25 mt-1" /></div>
          <div><Label className="text-xs">Default Meta Description</Label><Textarea defaultValue="Buy MVDA-approved residential plots in Vrindavan, Mathura & Govardhan. Premium gated townships with clear legal titles." className="bg-white border-gold/25 mt-1 min-h-[70px]" /></div>
          <div><Label className="text-xs">Meta Keywords (comma-separated)</Label><Input defaultValue="plot in vrindavan, property in mathura, govardhan plot, braj dham, mvda approved" className="bg-white border-gold/25 mt-1" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs">Google Search Console</Label><Input placeholder="Verification code" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Google Analytics 4</Label><Input placeholder="G-XXXXXXXXXX" className="bg-white border-gold/25 mt-1" /></div>
          </div>
          <Button onClick={() => save("SEO")} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </CardContent></Card>
      </TabsContent>

      <TabsContent value="payment" className="mt-4">
        <Card className="card-luxury rounded-xl"><CardContent className="p-6 space-y-4 max-w-2xl">
          <h3 className="font-display text-lg font-bold text-indigo-deep">Payment Gateway</h3>
          <div><Label className="text-xs">Razorpay Key ID</Label><Input defaultValue="rzp_live_XXXXXXXXXX" className="bg-white border-gold/25 mt-1 font-mono" /></div>
          <div><Label className="text-xs">Razorpay Secret</Label><Input type="password" defaultValue="••••••••••••" className="bg-white border-gold/25 mt-1 font-mono" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs">Min Booking Amount (₹)</Label><Input type="number" defaultValue="10000" className="bg-white border-gold/25 mt-1" /></div>
            <div><Label className="text-xs">Max Booking Amount (₹)</Label><Input type="number" defaultValue="50000" className="bg-white border-gold/25 mt-1" /></div>
          </div>
          <div><Label className="text-xs">GST Percentage</Label><Input type="number" defaultValue="18" className="bg-white border-gold/25 mt-1 w-32" /></div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-marble">
            <div><div className="text-sm font-medium text-indigo-deep">Test Mode</div><div className="text-xs text-muted-foreground">Use Razorpay test keys</div></div>
            <Switch defaultChecked />
          </div>
          <Button onClick={() => save("Payment")} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </CardContent></Card>
      </TabsContent>

      <TabsContent value="users" className="mt-4">
        <UserManager />
      </TabsContent>

      <TabsContent value="audit" className="mt-4">
        <Card className="card-luxury rounded-xl"><CardContent className="p-6">
          <h3 className="font-display text-lg font-bold text-indigo-deep mb-4">Audit Log</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto scroll-luxury">
            {[
              { user: "Super Admin", action: "Updated plot P012 status to 'sold'", time: "2 min ago", ip: "103.21.45.12" },
              { user: "Arjun Sharma", action: "Created new lead 'Rohit Verma'", time: "15 min ago", ip: "103.21.45.45" },
              { user: "Super Admin", action: "Edited project 'Bankey Bihari Dham'", time: "1 hour ago", ip: "103.21.45.12" },
              { user: "Meera Gupta", action: "Published blog post 'NRI Investment Guide'", time: "3 hours ago", ip: "103.21.45.78" },
              { user: "Arjun Sharma", action: "Updated lead stage 'Kavita Joshi' → 'qualified'", time: "5 hours ago", ip: "103.21.45.45" },
              { user: "Super Admin", action: "Changed booking amount range", time: "1 day ago", ip: "103.21.45.12" },
              { user: "System", action: "Database backup completed", time: "1 day ago", ip: "system" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gold/5 text-sm">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">{log.user.charAt(0)}</div>
                <div className="flex-1 min-w-0"><div className="text-indigo-deep truncate">{log.action}</div><div className="text-xs text-muted-foreground">{log.user} · {log.ip}</div></div>
                <div className="text-xs text-muted-foreground flex-shrink-0">{log.time}</div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </TabsContent>
    </Tabs>
  );
}

/* ─── Admin User Manager (real DB) ─── */

const ROLES = ["superadmin", "admin", "sales_manager", "sales_exec", "editor", "viewer"] as const;

const ROLE_COLORS: Record<string, string> = {
  superadmin: "bg-temple-red/15 text-temple-red border-temple-red/30",
  admin: "bg-gold/15 text-gold border-gold/30",
  sales_manager: "bg-green-light/15 text-green-deep border-green-light/30",
  sales_exec: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  editor: "bg-indigo-deep/10 text-indigo-deep border-indigo-deep/30",
  viewer: "bg-gray-500/15 text-gray-600 border-gray-500/30",
};

function UserManager() {
  const [users, setUsers] = useState<{ id: string; email: string; name: string; role: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<{ id: string; email: string; name: string; role: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "admin", password: "" });
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.ok) setUsers(json.data || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", role: "admin", password: "" });
    setShowForm(true);
  };

  const openEdit = (u: { id: string; email: string; name: string; role: string }) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, password: "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    if (!editing && !form.password) {
      toast.error("Password is required for new users");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        // Update existing user
        const body: Record<string, string> = { name: form.name, email: form.email, role: form.role };
        if (form.password) body.password = form.password;
        const res = await fetch(`/api/admin/users/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.ok) {
          toast.success("User updated");
          setShowForm(false);
          fetchUsers();
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        // Create new user
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const json = await res.json();
        if (json.ok) {
          toast.success("User created");
          setShowForm(false);
          fetchUsers();
        } else {
          toast.error(json.error || "Create failed");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="card-luxury rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-indigo-deep">Admin Users</h3>
          <Button size="sm" onClick={openCreate} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
            <Plus className="w-4 h-4 mr-1" /> Add User
          </Button>
        </div>

        {/* Create / Edit Form */}
        {showForm && (
          <div className="mb-4 p-4 rounded-lg bg-white border border-gold/25 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-indigo-deep">{editing ? "Edit User" : "New User"}</h4>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-indigo-deep"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label className="text-xs">Full Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="bg-cream border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="bg-cream border-gold/25 mt-1" /></div>
              <div><Label className="text-xs">Role</Label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full mt-1 h-9 rounded-md border border-gold/25 bg-cream px-3 text-sm text-indigo-deep focus:outline-none focus:ring-1 focus:ring-gold">
                  {ROLES.map((r) => <option key={r} value={r}>{r.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>)}
                </select>
              </div>
              <div><Label className="text-xs">{editing ? "New Password (leave blank to keep current)" : "Password"}</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editing ? "Leave blank to keep current" : "Set password"} className="bg-cream border-gold/25 mt-1" /></div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" onClick={() => setShowForm(false)} className="border-gold/25 text-muted-foreground">Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                {saving ? "Saving..." : editing ? "Update User" : "Create User"}
              </Button>
            </div>
          </div>
        )}

        {/* User List */}
        {loading ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">No users found. Click &quot;Add User&quot; to create one.</div>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-marble">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-gold/30">
                    <AvatarFallback className="bg-gradient-to-br from-gold-light to-gold-dark text-cream text-xs font-bold">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-indigo-deep">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={ROLE_COLORS[u.role] || ROLE_COLORS.viewer}>{u.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(u)} className="text-muted-foreground hover:text-gold h-7 text-xs"><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(u.id, u.name)} className="text-muted-foreground hover:text-temple-red h-7 text-xs"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
