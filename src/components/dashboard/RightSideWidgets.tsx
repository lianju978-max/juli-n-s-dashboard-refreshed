import { Lock, TrendingUp, Wallet, Star, Target, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useSavingsGoals, useFinanceSummary } from "@/hooks/useFinanceData";

const widgetVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface Props {
  onAddGoal: () => void;
}

const RightSideWidgets = ({ onAddGoal }: Props) => {
  const { data: goals } = useSavingsGoals();
  const { totalIncome, totalExpenses, balance } = useFinanceSummary();

  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
  const savingsRateClamped = Math.max(0, Math.min(100, savingsRate));

  return (
    <div className="flex flex-col gap-4 w-72 flex-shrink-0">
      {/* Savings Rate */}
      <motion.div custom={0} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-foreground">Tasa de ahorro</span>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="24" fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="6" />
              <motion.circle
                cx="30" cy="30" r="24" fill="none"
                stroke="hsl(211, 100%, 50%)" strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDasharray: 2 * Math.PI * 24, strokeDashoffset: 2 * Math.PI * 24 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - savingsRateClamped / 100) }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">{savingsRateClamped}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{savingsRateClamped}%</p>
            <p className="text-[10px] text-muted-foreground">del ingreso ahorrado</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div custom={1} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Resumen rápido</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: `$${(totalIncome / 1000).toFixed(1)}K`, label: "Ingresos" },
            { val: `$${(totalExpenses / 1000).toFixed(1)}K`, label: "Gastos" },
            { val: `$${(balance / 1000).toFixed(1)}K`, label: "Balance" },
          ].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-lg font-bold text-foreground">{t.val}</p>
              <p className="text-[10px] text-muted-foreground">{t.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Savings Goals */}
      <motion.div custom={2} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Metas de ahorro</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAddGoal}
            className="text-primary"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="space-y-3">
          {goals && goals.length > 0 ? goals.slice(0, 3).map((goal) => {
            const progress = goal.target_amount > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0;
            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-foreground">{goal.name}</p>
                  <span className="text-[10px] text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full gradient-blue rounded-full"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  ${Number(goal.current_amount).toLocaleString()} / ${Number(goal.target_amount).toLocaleString()}
                </p>
              </div>
            );
          }) : (
            <p className="text-xs text-muted-foreground text-center py-2">Crea tu primera meta</p>
          )}
        </div>
      </motion.div>

      {/* Add Goal CTA */}
      <motion.div custom={3} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Nueva meta</span>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">Define tus objetivos financieros y monitorea tu progreso.</p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddGoal}
          className="w-full gradient-blue text-primary-foreground text-xs font-semibold py-2.5 rounded-xl"
        >
          Crear meta
        </motion.button>
      </motion.div>

      {/* Review Rating */}
      <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <span className="text-xs font-bold text-foreground block mb-2">Estado financiero</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => {
            const rating = savingsRateClamped >= 40 ? 5 : savingsRateClamped >= 30 ? 4 : savingsRateClamped >= 20 ? 3 : savingsRateClamped >= 10 ? 2 : 1;
            return (
              <motion.div key={s} whileHover={{ scale: 1.3, rotate: 10 }}>
                <Star className={`w-4 h-4 ${s <= rating ? "text-primary fill-primary" : "text-muted"}`} />
              </motion.div>
            );
          })}
          <span className="text-xs text-muted-foreground ml-1">{savingsRateClamped >= 30 ? "Excelente" : savingsRateClamped >= 15 ? "Bien" : "Mejorar"}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RightSideWidgets;
