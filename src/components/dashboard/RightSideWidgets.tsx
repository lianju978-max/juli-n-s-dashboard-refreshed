import { useState } from "react";
import { Lock, TrendingUp, Wallet, Star, Target, Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSavingsGoals, useFinanceSummary, useDeleteSavingsGoal } from "@/hooks/useFinanceData";
import EditSavingsGoalDialog from "./EditSavingsGoalDialog";
import { toast } from "sonner";

const widgetVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface Props {
  onAddGoal: () => void;
}

const RightSideWidgets = ({ onAddGoal }: Props) => {
  const { data: goals } = useSavingsGoals();
  const { totalIncome, totalExpenses, balance } = useFinanceSummary();
  const deleteGoal = useDeleteSavingsGoal();
  const [editGoal, setEditGoal] = useState<any>(null);

  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
  const savingsRateClamped = Math.max(0, Math.min(100, savingsRate));

  const handleDeleteGoal = async (id: string) => {
    if (!confirm("¿Eliminar esta meta de ahorro?")) return;
    try {
      await deleteGoal.mutateAsync(id);
      toast.success("Meta eliminada");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-1 xl:sticky xl:top-4">
        {/* Tasa de ahorro */}
        <motion.div custom={0} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card overflow-hidden p-4 sm:p-5">
          <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">Tasa de ahorro</span>
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0">
              <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
                <circle cx="30" cy="30" r="24" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                <motion.circle cx="30" cy="30" r="24" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"
                  initial={{ strokeDasharray: 2 * Math.PI * 24, strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - savingsRateClamped / 100) }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-extrabold text-foreground">{savingsRateClamped}%</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">{savingsRateClamped}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">del ingreso termina como ahorro</p>
            </div>
          </div>
        </motion.div>

        {/* Resumen rápido */}
        <motion.div custom={1} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4 sm:p-5">
          <div className="mb-3 sm:mb-4 flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">Resumen rápido</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { val: `$${(totalIncome / 1000).toFixed(1)}K`, label: "Ingresos" },
              { val: `$${(totalExpenses / 1000).toFixed(1)}K`, label: "Gastos" },
              { val: `$${(balance / 1000).toFixed(1)}K`, label: "Balance" },
            ].map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="neo-inset rounded-lg sm:rounded-[1rem] p-2 sm:p-3 text-center">
                <p className="text-xs sm:text-base font-extrabold text-foreground truncate">{t.val}</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">{t.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Metas de ahorro */}
        <motion.div custom={2} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4 sm:p-5 sm:col-span-2 xl:col-span-1">
          <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground truncate">Metas de ahorro</span>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onAddGoal} className="rounded-lg sm:rounded-xl bg-primary/10 p-1.5 sm:p-2 text-primary flex-shrink-0">
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {goals && goals.length > 0 ? goals.slice(0, 4).map((goal) => {
              const progress = goal.target_amount > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0;
              return (
                <div key={goal.id} className="neo-inset group rounded-xl sm:rounded-[1.1rem] p-3 sm:p-4">
                  <div className="mb-1.5 sm:mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate min-w-0">{goal.name}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => setEditGoal(goal)} className="rounded-lg p-1 hover:bg-accent transition-colors">
                          <Pencil className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDeleteGoal(goal.id)} className="rounded-lg p-1 hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-destructive" />
                        </button>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 1, delay: 0.5 }} className="gradient-blue h-full rounded-full" />
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-muted-foreground truncate">
                    ${Number(goal.current_amount).toLocaleString()} / ${Number(goal.target_amount).toLocaleString()}
                  </p>
                </div>
              );
            }) : (
              <p className="py-2 text-center text-[10px] sm:text-xs text-muted-foreground">Crea tu primera meta</p>
            )}
          </div>
        </motion.div>

        {/* Nueva meta */}
        <motion.div custom={3} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4 sm:p-5">
          <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">Nueva meta</span>
          </div>
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">Define objetivos financieros con seguimiento visible.</p>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onAddGoal} className="gradient-blue w-full rounded-xl sm:rounded-2xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground">
            Crear meta
          </motion.button>
        </motion.div>

        {/* Estado financiero */}
        <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4 sm:p-5">
          <span className="mb-2 sm:mb-3 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">Estado financiero</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => {
              const rating = savingsRateClamped >= 40 ? 5 : savingsRateClamped >= 30 ? 4 : savingsRateClamped >= 20 ? 3 : savingsRateClamped >= 10 ? 2 : 1;
              return (
                <motion.div key={s} whileHover={{ scale: 1.2, rotate: 8 }}>
                  <Star className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${s <= rating ? "text-primary fill-primary" : "text-muted"}`} />
                </motion.div>
              );
            })}
            <span className="ml-1 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{savingsRateClamped >= 30 ? "Excelente" : savingsRateClamped >= 15 ? "Bien" : "Mejorar"}</span>
          </div>
        </motion.div>
      </div>

      <EditSavingsGoalDialog open={!!editGoal} onClose={() => setEditGoal(null)} goal={editGoal} />
    </>
  );
};

export default RightSideWidgets;
