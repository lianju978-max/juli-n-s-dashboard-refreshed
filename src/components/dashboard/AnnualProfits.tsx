import { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceSummary } from "@/hooks/useFinanceData";
import FinancialDetailDialog from "./FinancialDetailDialog";

const AnnualProfits = () => {
  const [showDetail, setShowDetail] = useState(false);
  const { totalIncome, totalExpenses, balance } = useFinanceSummary();
  const total = totalIncome + totalExpenses || 1;

  const radius1 = 70;
  const radius2 = 55;
  const radius3 = 40;
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;

  const incomeRatio = totalIncome / total;
  const expenseRatio = totalExpenses / total;
  const profitRatio = Math.max(balance, 0) / total;

  const fmt = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -4 }}
        className="neo-card overflow-hidden p-3 sm:p-4 lg:p-5"
      >
        <button onClick={() => setShowDetail(true)} className="mb-3 sm:mb-4 flex w-full items-start justify-between gap-2 text-left group">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-muted-foreground">Análisis</p>
            <h3 className="mt-1.5 sm:mt-2 text-base sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">Resumen financiero</h3>
          </div>
          <span className="flex-shrink-0 rounded-full border border-border/60 bg-background/70 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary whitespace-nowrap">Ver detalle</span>
        </button>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="flex items-center justify-center">
            <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px]">
              <svg width="100%" height="100%" viewBox="0 0 180 180" className="drop-shadow-[0_16px_28px_hsl(var(--primary)/0.12)]">
                <circle cx="90" cy="90" r={radius1} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                <motion.circle
                  cx="90" cy="90" r={radius1} fill="none"
                  stroke="url(#incomeGrad)" strokeWidth="12"
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                  initial={{ strokeDasharray: circumference1, strokeDashoffset: circumference1 }}
                  animate={{ strokeDashoffset: circumference1 * (1 - incomeRatio) }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
                <circle cx="90" cy="90" r={radius2} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                <motion.circle
                  cx="90" cy="90" r={radius2} fill="none"
                  stroke="url(#expenseGrad)" strokeWidth="12"
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                  initial={{ strokeDasharray: circumference2, strokeDashoffset: circumference2 }}
                  animate={{ strokeDashoffset: circumference2 * (1 - expenseRatio) }}
                  transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                />
                <circle cx="90" cy="90" r={radius3} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                <motion.circle
                  cx="90" cy="90" r={radius3} fill="none"
                  stroke="url(#balanceGrad)" strokeWidth="12"
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                  initial={{ strokeDasharray: circumference3, strokeDashoffset: circumference3 }}
                  animate={{ strokeDashoffset: circumference3 * (1 - profitRatio) }}
                  transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="incomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(193 100% 55%)" />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--destructive))" />
                    <stop offset="100%" stopColor="hsl(22 100% 56%)" />
                  </linearGradient>
                  <linearGradient id="balanceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" />
                    <stop offset="100%" stopColor="hsl(168 78% 44%)" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-foreground">{fmt(balance)}</span>
                <span className="text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-muted-foreground">Balance</span>
              </motion.div>
            </div>
          </div>

          <div className="grid gap-2 sm:gap-3">
            {[
              { label: "Ingresos", value: totalIncome, tone: "text-primary", dot: "bg-primary" },
              { label: "Gastos", value: totalExpenses, tone: "text-destructive", dot: "bg-destructive" },
              { label: "Resultado neto", value: balance, tone: balance >= 0 ? "text-secondary" : "text-destructive", dot: balance >= 0 ? "bg-secondary" : "bg-destructive" },
            ].map((item, index) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + index * 0.08 }} className="neo-inset flex items-center justify-between gap-2 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full flex-shrink-0 ${item.dot}`} />
                  <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{item.label}</p>
                </div>
                <p className={`text-sm sm:text-lg font-extrabold tracking-tight flex-shrink-0 ${item.tone}`}>{fmt(item.value)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <FinancialDetailDialog open={showDetail} onClose={() => setShowDetail(false)} />
    </>
  );
};

export default AnnualProfits;
