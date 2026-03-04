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
      className="neo-card p-5"
    >
      <button onClick={() => setShowDetail(true)} className="flex items-center justify-between mb-4 w-full text-left group">
        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Resumen Financiero</h3>
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Ver detalle →</span>
      </button>

      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={radius1} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius1} fill="none"
              stroke="url(#incomeGrad)" strokeWidth="12"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              initial={{ strokeDasharray: circumference1, strokeDashoffset: circumference1 }}
              animate={{ strokeDashoffset: circumference1 * (1 - incomeRatio) }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
            <circle cx="90" cy="90" r={radius2} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius2} fill="none"
              stroke="url(#expenseGrad)" strokeWidth="12"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              initial={{ strokeDasharray: circumference2, strokeDashoffset: circumference2 }}
              animate={{ strokeDashoffset: circumference2 * (1 - expenseRatio) }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            />
            <circle cx="90" cy="90" r={radius3} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
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
              <linearGradient id="blueGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(211, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(200, 100%, 60%)" />
              </linearGradient>
              <linearGradient id="blueGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(200, 100%, 60%)" />
                <stop offset="100%" stopColor="hsl(177, 69%, 50%)" />
              </linearGradient>
              <linearGradient id="blueGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(177, 69%, 41%)" />
                <stop offset="100%" stopColor="hsl(190, 80%, 55%)" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-lg font-bold text-foreground">{fmt(balance)}</span>
            <span className="text-xs text-muted-foreground">Balance</span>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-around text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Ingresos</p>
          <p className="text-sm font-bold text-foreground">{fmt(totalIncome)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <div className="w-2 h-2 rounded-full bg-secondary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Gastos</p>
          <p className="text-sm font-bold text-foreground">{fmt(totalExpenses)}</p>
        </motion.div>
      </div>
    </motion.div>
    <FinancialDetailDialog open={showDetail} onClose={() => setShowDetail(false)} />
    </>
  );
};

export default AnnualProfits;
