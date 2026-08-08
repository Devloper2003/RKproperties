"use client";

import { useState } from "react";
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
import { Building2, Phone, Search, CreditCard, Users, History, Save } from "lucide-react";

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
        <Card className="card-luxury rounded-xl"><CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-indigo-deep">Admin Users</h3>
            <Button size="sm" className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"><Users className="w-4 h-4 mr-1" /> Add User</Button>
          </div>
          <div className="space-y-2">
            {[
              { name: "Super Admin", email: "admin@rkproperties.in", role: "SuperAdmin", color: "bg-temple-red/15 text-temple-red border-temple-red/30" },
              { name: "Gopal Das", email: "gopal@rkproperties.in", role: "Admin", color: "bg-gold/15 text-gold border-gold/30" },
              { name: "Arjun Sharma", email: "arjun@rkproperties.in", role: "Sales Manager", color: "bg-green-light/15 text-green-deep border-green-light/30" },
              { name: "Meera Gupta", email: "meera@rkproperties.in", role: "Editor", color: "bg-indigo-deep/10 text-indigo-deep border-indigo-deep/30" },
            ].map((u) => (
              <div key={u.email} className="flex items-center justify-between p-3 rounded-lg bg-marble">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-gold/30"><AvatarFallback className="bg-gradient-to-br from-gold-light to-gold-dark text-cream text-xs font-bold">{u.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                  <div><div className="text-sm font-medium text-indigo-deep">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={u.color}>{u.role}</Badge>
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-gold h-7 text-xs">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent></Card>
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
