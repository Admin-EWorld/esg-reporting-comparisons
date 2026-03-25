"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { Package, Plus, Trash2, Edit3, Save, X, FileCode, ShieldCheck } from "lucide-react";

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    price: 0, 
    tag: "", 
    description: "", 
    imageUrl: "",
    fileUrl: "",
    isSubscription: false, // New field
    duration: "MONTHLY" as "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "LIFETIME" // New field, default value
  });

  const DURATION_OPTIONS = ["MONTHLY", "QUARTERLY", "ANNUALLY", "LIFETIME"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({ 
        name: product.name, 
        price: product.price, 
        tag: product.tag || "", 
        description: product.description || "", 
        imageUrl: product.imageUrl || "",
        fileUrl: product.fileUrl || "",
        isSubscription: product.isSubscription || false, // Populate new field
        duration: product.duration || "MONTHLY" // Populate new field
    });
  };

  const handleSave = async (id: string | null) => {
    const method = id ? "PATCH" : "POST";
    try {
      await fetch("/api/admin/products", {
        method: method,
        body: JSON.stringify(id ? { id, ...formData } : formData)
      });
      setEditingId(null);
      setFormData({ name: "", price: 0, tag: "", description: "", imageUrl: "", fileUrl: "", isSubscription: false, duration: "MONTHLY" });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Terminate this product asset?")) return;
    try {
      await fetch("/api/admin/products", {
        method: "DELETE",
        body: JSON.stringify({ id })
      });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans">
      <Navbar />

      <main className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <BackButton />
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Asset Inventory</h1>
            <p className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">Supply Chain Control • Real-Time Nodes</p>
          </div>
          {!editingId && (
              <button 
                onClick={() => setEditingId("new")}
                className="px-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-amber-500 transition-all flex items-center gap-2"
              >
                <Plus className="w-3 h-3" /> Create New Asset
              </button>
          )}
        </div>

        {editingId && (
            <div className="mb-12 p-10 bg-white/[0.02] border border-amber-500/30 rounded-[40px] animate-in fade-in zoom-in-95 duration-300 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">
                    {editingId === "new" ? "Establishing New Asset" : "Modifying Inventory Node"}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Product Name</label>
                        <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-amber-500" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Price (USD)</label>
                        <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-amber-500" />
                    </div>
                    <div className="space-y-4 flex items-center justify-start gap-4 mt-4">
                        <input type="checkbox" checked={formData.isSubscription} onChange={e => setFormData({...formData, isSubscription: e.target.checked})} id="isSubscription" className="w-5 h-5 accent-amber-500" />
                        <label htmlFor="isSubscription" className="text-sm font-bold text-white uppercase tracking-widest cursor-pointer">Is Subscription Product?</label>
                    </div>
                    {formData.isSubscription && (
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Subscription Duration</label>
                            <select value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value as "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "LIFETIME"})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-amber-500">
                                {DURATION_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Status Tag</label>
                        <input value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-amber-500" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Logo/Image Path</label>
                        <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-amber-500" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest pl-1 flex items-center gap-2">
                           <FileCode className="w-3 h-3" /> Secure Digital Asset Path (Internal)
                        </label>
                        <input 
                           value={formData.fileUrl} 
                           onChange={e => setFormData({...formData, fileUrl: e.target.value})} 
                           placeholder="/uploads/assets/ShaniGoldHybrid.mq5"
                           className="w-full bg-black/60 border border-amber-500/20 rounded-2xl px-5 py-4 text-amber-400 font-mono text-sm outline-none focus:border-amber-500" 
                        />
                        <p className="text-[8px] text-slate-600 uppercase font-bold pl-1 italic">Authorized path for verified acquisition delivery.</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                        <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-white outline-none focus:border-amber-500" />
                    </div>
                </div>
                <div className="mt-10 flex gap-4">
                    <button onClick={() => handleSave(editingId === "new" ? null : editingId)} className="flex-1 py-5 bg-amber-500 text-black font-black uppercase text-xs rounded-2xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Commit Changes
                    </button>
                    <button onClick={() => setEditingId(null)} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase text-xs rounded-2xl hover:bg-red-500/20">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {loading ? (
             <div className="col-span-full py-32 text-center animate-pulse text-slate-600 font-black tracking-widest uppercase italic">Scanning Mainframe...</div>
           ) : (
             products.map((product) => (
               <div key={product.id} className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden group hover:border-white/10 transition-all duration-500">
                  <div className="h-40 bg-black relative flex items-center justify-center p-8">
                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute top-6 right-6 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500">
                        {product.tag}
                     </div>
                  </div>
                  <div className="p-10 bg-white/[0.01]">
                     <div className="mb-4">
                        <h3 className="text-lg font-bold text-white mb-1 tracking-tight line-clamp-1 italic">{product.name}</h3>
                        <p className="text-xl font-black text-amber-500 tracking-tighter">${product.price}</p>
                     </div>
                     {product.fileUrl && (
                        <div className="flex items-center gap-2 text-emerald-500 text-[8px] font-black uppercase tracking-widest mb-6">
                           <ShieldCheck className="w-3 h-3" /> Asset Encrypted & Linked
                        </div>
                     )}
                     <div className="pt-6 border-t border-white/5 flex gap-3">
                        <button onClick={() => handleEdit(product)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2">
                           <Edit3 className="w-3 h-3" /> Modify
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500/50 hover:text-red-500 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
             ))
           )}
        </div>
      </main>
    </div>
  );
}
