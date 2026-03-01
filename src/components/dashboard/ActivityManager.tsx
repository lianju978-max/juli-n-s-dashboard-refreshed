import { Search, ChevronDown, Wallet, BarChart3, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useFinanceSummary, useTransactions } from "@/hooks/useFinanceData";

const listItem = {
  hidden: { opacity: 0, x: -15 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.8 + i * 0.1, duration: 0.3 } as const,
  }),
};

const ActivityManager = () => {
  const { monthlyData, balance } = useFinanceSummary();
  const { data: transactions } = useTransactions();

  const months = Object.entries(monthlyData).slice(-8);
  const maxVal = Math.max(...months.flatMap(([, v]) => [v.income, v.expense]), 1);

  // Recent transactions
  const recentTx = (transactions ?? []).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="neo-card p-5 flex-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Actividad Financiera</h3>
        <div className="flex items-center gap-3">
          <div className="neo-pressed flex items-center gap-2 px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input className="bg-transparent text-xs outline-none w-20 placeholder:text-muted-foreground" placeholder="Buscar..." />
          </div>
        </div>
      </div>

      {/* Main value */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="mb-4"
      >
        <span className="text-3xl font-bold text-foreground">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        <span className="text-sm text-muted-foreground ml-1">USD</span>
      </motion.div>

      {/* Bar chart */}
      <div className="flex items-end gap-3 h-32 mb-5 px-2">
        {months.length > 0 ? months.map(([month, vals], idx) => (
          <div key={month} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-0.5 w-full items-end h-24">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(vals.income / maxVal) * 100}%` }}
                transition={{ delay: 0.4 + idx * 0.06, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scaleY: 1.1, originY: 1 }}
                className="flex-1 rounded-t-md gradient-blue"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(vals.expense / maxVal) * 100}%` }}
                transition={{ delay: 0.45 + idx * 0.06, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scaleY: 1.1, originY: 1 }}
                className="flex-1 rounded-t-md bg-secondary/60"
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{month}</span>
          </div>
        )) : (
          <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
            Registra transacciones para ver el gráfico
          </div>
        )}
      </div>

      {/* Recent transactions list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-foreground">Últimas transacciones</h4>
        </div>
        <div className="space-y-2.5">
          {recentTx.length > 0 ? recentTx.map((tx, i) => (
            <motion.div
              key={tx.id}
              custom={i}
              variants={listItem}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.02, x: 4 }}
              className="neo-pressed flex items-center gap-3 p-3 cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "income" ? "gradient-blue-light" : "bg-destructive/10"}`}>
                {tx.type === "income" ? <ArrowDownLeft className="w-4 h-4 text-primary" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{tx.description || (tx.type === "income" ? "Ingreso" : "Gasto")}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(tx.date).toLocaleDateString("es")}</p>
              </div>
              <span className={`text-xs font-semibold ${tx.type === "income" ? "text-primary" : "text-destructive"}`}>
                {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </motion.div>
          )) : (
            <p className="text-xs text-muted-foreground text-center py-4">No hay transacciones aún</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityManager;
