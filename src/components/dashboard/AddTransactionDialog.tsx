import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useAddTransaction, useCategories, useAddCategory } from "@/hooks/useFinanceData";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTransactionDialog = ({ open, onClose }: Props) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [showNewCat, setShowNewCat] = useState(false);

  const { data: categories } = useCategories();
  const addTransaction = useAddTransaction();
  const addCategory = useAddCategory();

  const filteredCats = categories?.filter((c) => c.type === type) ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction.mutateAsync({
        type,
        amount: parseFloat(amount),
        description: description || undefined,
        date,
        category_id: categoryId || undefined,
      });
      toast.success(type === "income" ? "Ingreso registrado" : "Gasto registrado");
      onClose();
      setAmount("");
      setDescription("");
      setCategoryId("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const cat = await addCategory.mutateAsync({ name: newCatName.trim(), type });
      setCategoryId(cat.id);
      setNewCatName("");
      setShowNewCat(false);
      toast.success("Categoría creada");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="neo-card p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-foreground">Nueva transacción</h3>
              <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type toggle */}
              <div className="flex gap-2">
                {(["income", "expense"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setType(t); setCategoryId(""); }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                      type === t ? "gradient-blue text-primary-foreground" : "neo-pressed text-muted-foreground"
                    }`}
                  >
                    {t === "income" ? "Ingreso" : "Gasto"}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Monto ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Descripción</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                  className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground"
                  placeholder="Ej: Almuerzo, Salario..."
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-foreground">Categoría</label>
                  <button type="button" onClick={() => setShowNewCat(!showNewCat)} className="text-xs text-primary font-medium">
                    <Plus className="w-3 h-3 inline" /> Nueva
                  </button>
                </div>
                {showNewCat && (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="flex-1 neo-pressed px-3 py-2 text-xs bg-transparent outline-none text-foreground"
                      placeholder="Nombre de categoría"
                    />
                    <button type="button" onClick={handleAddCategory} className="gradient-blue text-primary-foreground text-xs px-3 py-2 rounded-lg font-medium">
                      Añadir
                    </button>
                  </div>
                )}
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground"
                >
                  <option value="">Sin categoría</option>
                  {filteredCats.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={addTransaction.isPending}
                className="w-full gradient-blue text-primary-foreground font-semibold py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                {addTransaction.isPending ? "Guardando..." : "Guardar transacción"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionDialog;
