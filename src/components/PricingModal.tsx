import React, { useState } from "react";
import { X, CreditCard, Plus, Check, Trash2, Edit2, Save } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PricingModalProps {
  onClose: () => void;
  isAdmin: boolean;
  plans: PricingPlan[];
  onUpdatePlans: (plans: PricingPlan[]) => void;
}

export function PricingModal({ onClose, isAdmin, plans, onUpdatePlans }: PricingModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PricingPlan | null>(null);

  const startEdit = (plan: PricingPlan) => {
    setEditingId(plan.id);
    setEditForm({ ...plan, features: [...plan.features] });
  };

  const saveEdit = () => {
    if (editForm) {
      if (editForm.id === "new") {
        onUpdatePlans([...plans, { ...editForm, id: Date.now().toString() }]);
      } else {
        onUpdatePlans(plans.map((p) => (p.id === editForm.id ? editForm : p)));
      }
      setEditingId(null);
      setEditForm(null);
    }
  };

  const deletePlan = (id: string) => {
    onUpdatePlans(plans.filter((p) => p.id !== id));
  };

  const addNewPlan = () => {
    const newPlan: PricingPlan = {
      id: "new",
      name: "New Plan",
      price: "$0",
      description: "Plan description",
      features: ["Feature 1"],
    };
    setEditingId("new");
    setEditForm(newPlan);
  };

  const updateFeature = (index: number, val: string) => {
    if (!editForm) return;
    const newFeatures = [...editForm.features];
    newFeatures[index] = val;
    setEditForm({ ...editForm, features: newFeatures });
  };

  const addFeature = () => {
    if (!editForm) return;
    setEditForm({ ...editForm, features: [...editForm.features, ""] });
  };

  const removeFeature = (index: number) => {
    if (!editForm) return;
    const newFeatures = editForm.features.filter((_, i) => i !== index);
    setEditForm({ ...editForm, features: newFeatures });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden m-4 max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <CreditCard size={16} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-300">
                Pricing & Plans
              </h2>
              <p className="text-xs text-zinc-500">
                {isAdmin ? "Manage subscription plans and features." : "Choose the plan that fits your workflow."}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors p-2 hover:bg-zinc-800 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto w-full flex-1">
          {isAdmin && editingId !== "new" && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={addNewPlan}
                className="px-4 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white transition-colors"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Plus size={14} /> Add Plan
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-[#050505] border border-zinc-800 rounded-xl flex flex-col overflow-hidden relative group">
                {editingId === plan.id && editForm ? (
                   // Edit Mode
                   <div className="p-6 flex flex-col gap-4 flex-1">
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Plan Name</label>
                       <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Price</label>
                       <input type="text" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Description</label>
                       <input type="text" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block flex justify-between items-center">
                         Features
                         <button onClick={addFeature} className="text-orange-500 hover:text-orange-400 p-1"><Plus size={12} /></button>
                       </label>
                       <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                         {editForm.features.map((feat, i) => (
                           <div key={i} className="flex gap-2">
                             <input type="text" value={feat} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500" />
                             <button onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400"><Trash2 size={12}/></button>
                           </div>
                         ))}
                       </div>
                     </div>
                     <div className="mt-auto pt-4 flex gap-2">
                       <button onClick={saveEdit} className="flex-1 bg-green-600/20 text-green-500 hover:bg-green-600/30 border border-green-600/30 rounded py-2 text-xs font-bold uppercase flex items-center justify-center gap-2"><Save size={14}/> Save</button>
                       <button onClick={() => setEditingId(null)} className="flex-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded py-2 text-xs font-bold uppercase transition-colors">Cancel</button>
                     </div>
                   </div>
                ) : (
                  // View Mode
                  <>
                    {isAdmin && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                        <button onClick={() => startEdit(plan)} className="p-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-zinc-400 hover:text-white"><Edit2 size={12} /></button>
                        <button onClick={() => deletePlan(plan.id)} className="p-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-zinc-400 hover:text-red-400"><Trash2 size={12} /></button>
                      </div>
                    )}
                    <div className="p-6 border-b border-zinc-800 flex flex-col items-center text-center">
                      <h3 className="text-lg font-semibold text-zinc-200 mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold tracking-tighter text-white mb-2">{plan.price}</div>
                      <p className="text-xs text-zinc-500">{plan.description}</p>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <ul className="space-y-4 flex-1 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                            <Check size={16} className="text-orange-500 mt-0.5 shrink-0" style={{ color: "var(--color-primary)" }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {!isAdmin && (
                        <button className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                          Subscribe
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}

            {editingId === "new" && editForm && (
              <div className="bg-[#050505] border border-orange-500/30 rounded-xl flex flex-col overflow-hidden relative shadow-[0_0_15px_rgba(237,57,21,0.1)]">
                 <div className="p-6 flex flex-col gap-4 flex-1">
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Plan Name</label>
                       <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Price</label>
                       <input type="text" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Description</label>
                       <input type="text" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500" />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block flex justify-between items-center">
                         Features
                         <button onClick={addFeature} className="text-orange-500 hover:text-orange-400 p-1"><Plus size={12} /></button>
                       </label>
                       <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                         {editForm.features.map((feat, i) => (
                           <div key={i} className="flex gap-2">
                             <input type="text" value={feat} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500" />
                             <button onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400"><Trash2 size={12}/></button>
                           </div>
                         ))}
                       </div>
                     </div>
                     <div className="mt-auto pt-4 flex gap-2">
                       <button onClick={saveEdit} className="flex-1 bg-green-600/20 text-green-500 hover:bg-green-600/30 border border-green-600/30 rounded py-2 text-xs font-bold uppercase flex items-center justify-center gap-2"><Save size={14}/> Save</button>
                       <button onClick={() => { setEditingId(null); setEditForm(null); }} className="flex-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded py-2 text-xs font-bold uppercase transition-colors">Cancel</button>
                     </div>
                   </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
