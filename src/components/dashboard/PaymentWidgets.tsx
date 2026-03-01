import { CreditCard, ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useFinanceSummary } from "@/hooks/useFinanceData";

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PaymentWidgets = () => {
  const { totalIncome, totalExpenses, balance, monthlyData } = useFinanceSummary();
  const months = Object.entries(monthlyData);
  const maxVal = Math.max(...months.flatMap(([, v]) => [v.income, v.expense]), 1);

  return (
    <div className="flex gap-4">
      {/* Balance Card */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="neo-card p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-foreground">Balance</span>
          </div>
          <div className="flex gap-1">
            <div className={`w-2 h-2 rounded-full ${balance >= 0 ? "bg-primary" : "bg-destructive"}`}></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-1">Balance actual</p>
        <p className="text-xl font-bold text-foreground mb-4 tracking-wide">${fmt(balance)}</p>
        <div className="flex gap-3 mb-4">
          <motion.div whileHover={{ scale: 1.03 }} className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowDownLeft className="w-3.5 h-3.5 text-primary" /> Ingresos
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowUpRight className="w-3.5 h-3.5 text-destructive" /> Gastos
          </motion.div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Transacciones</p>
            <p className="text-sm font-bold text-foreground">{months.length} meses</p>
          </div>
        </div>
      </motion.div>

      {/* Income/Expenses */}
      <div className="flex-1 flex flex-col gap-4">
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Ingresos</span>
          </div>
          <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }} className="text-2xl font-bold text-foreground">${fmt(totalIncome)}</motion.p>
        </motion.div>
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Gastos</span>
          </div>
          <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="text-2xl font-bold text-foreground">${fmt(totalExpenses)}</motion.p>
        </motion.div>
      </div>

      {/* Mini chart */}
      <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -4 }} className="neo-card p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Resumen mensual</p>
          <p className="text-sm font-semibold text-foreground mb-3">Ingresos vs Gastos</p>
        </div>
        <div className="flex items-end gap-1 h-16 mb-3">
          {months.length > 0 ? months.slice(-12).map(([month, vals], i) => (
            <motion.div
              key={month}
              initial={{ height: 0 }}
              animate={{ height: `${(vals.income / maxVal) * 100}%` }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="flex-1 rounded-t-sm gradient-blue opacity-70"
              title={`${month}: $${fmt(vals.income)}`}
            />
          )) : (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-muted h-4" />
            ))
          )}
        </div>
        <p className="text-[10px] text-muted-foreground text-center">
          {months.length === 0 ? "Sin datos aún" : "Últimos meses"}
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentWidgets;
