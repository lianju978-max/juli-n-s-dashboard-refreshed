import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUpdateSavingsGoal } from "@/hooks/useFinanceData";
import { toast } from "sonner";

interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  goal: Goal | null;
}

const EditSavingsGoalDialog = ({ open, onClose, goal }: Props) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const updateGoal = useUpdateSavingsGoal();

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(String(goal.target_amount));
      setCurrentAmount(String(goal.current_amount));
      setDeadline(goal.deadline ?? "");
    }
  }, [goal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;
    try {
      await updateGoal.mutateAsync({
        id: goal.id,
        name,
        target_amount: parseFloat(targetAmount),
        current_amount: parseFloat(currentAmount) || 0,
        deadline: deadline || null,
      });
      toast.success("Meta actualizada");
      onClose();
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
              <h3 className="text-sm font-bold text-foreground">Editar meta de ahorro</h3>
              <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Monto objetivo ($)</label>
                <input type="number" step="0.01" min="0.01" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Monto actual ($)</label>
                <input type="number" step="0.01" min="0" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)} className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Fecha límite</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={updateGoal.isPending}
                className="w-full gradient-blue text-primary-foreground font-semibold py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                {updateGoal.isPending ? "Guardando..." : "Actualizar meta"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditSavingsGoalDialog;
