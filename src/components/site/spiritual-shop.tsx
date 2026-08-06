"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Sparkles, Package } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SPIRITUAL_PRODUCTS } from "@/lib/types";
import { formatINRFull } from "@/lib/types";
import { toast } from "sonner";

const CATEGORIES = ["All", "Japa Mala", "Deity", "Puja Items", "Prasad", "Books", "Decor"];

export function SpiritualShop() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<Set<string>>(new Set());

  const filtered = filter === "All" ? SPIRITUAL_PRODUCTS : SPIRITUAL_PRODUCTS.filter((p) => p.category === filter);

  const toggleCart = (id: string) => {
    const newSet = new Set(cart);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
      const product = SPIRITUAL_PRODUCTS.find((p) => p.id === id);
      toast.success(`🛒 ${product?.name} added to cart!`);
    }
    setCart(newSet);
  };

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Devotional Store"
          title="Spiritual"
          highlight="Shop"
          subtitle="Bring Krishna's blessings home. Authentic spiritual items sourced directly from Braj Dham — Tulsi malas, deity idols, prasad, puja items, and sacred books. Every purchase supports our goshala."
          light
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === cat ? "bg-gold text-indigo-deep" : "bg-cream/10 text-cream/70 hover:bg-cream/20 border border-cream/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => {
            const inCart = cart.has(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`bg-cream/5 backdrop-blur-sm border rounded-2xl h-full flex flex-col transition-all ${inCart ? "border-gold/50 ring-gold-glow" : "border-cream/15 hover:border-gold/30"}`}>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    {/* Product emoji */}
                    <div className="aspect-square rounded-xl bg-cream/5 flex items-center justify-center mb-3 text-5xl">
                      {product.emoji}
                    </div>

                    {/* Info */}
                    <Badge variant="outline" className="text-[9px] border-gold/30 text-gold mb-1 self-start">{product.category}</Badge>
                    <h3 className="font-display text-sm font-bold text-cream leading-tight mb-0.5">{product.name}</h3>
                    <span className="font-devanagari text-[11px] text-gold mb-2">{product.sanskrit}</span>
                    <p className="text-[11px] text-cream/60 leading-relaxed mb-3 flex-1 line-clamp-3">{product.desc}</p>

                    {/* Price + cart */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-lg font-bold text-gold">{formatINRFull(product.price)}</span>
                    </div>
                    <Button
                      onClick={() => toggleCart(product.id)}
                      size="sm"
                      className={`w-full h-8 text-xs font-semibold ${
                        inCart
                          ? "bg-green-light/20 text-green-light border border-green-light/30 hover:bg-green-light/30"
                          : "gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep"
                      }`}
                    >
                      {inCart ? <><Check className="w-3 h-3 mr-1" /> In Cart</> : <><ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart</>}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Cart bar */}
        {cart.size > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100vw-2rem)]"
          >
            <div className="bg-spiritual-temple border border-gold/30 rounded-2xl shadow-2xl p-3 flex items-center gap-3">
              <Package className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-cream"><span className="font-bold text-gold">{cart.size}</span> item{cart.size > 1 ? "s" : ""} in cart</div>
              </div>
              <Button
                size="sm"
                onClick={() => toast.success("🛒 Order placed! WhatsApp confirmation sent.")}
                className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs"
              >
                Checkout
              </Button>
            </div>
          </motion.div>
        )}

        {/* Bottom note */}
        <div className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/15 text-center">
          <p className="text-xs text-cream/70 italic flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold" />
            Every purchase supports our 47-cow goshala. Free shipping above ₹999. All items blessed at Banke Bihari Temple before dispatch.
          </p>
        </div>
      </div>
    </section>
  );
}
