import { CreditCard, ArrowDownLeft, ArrowUpRight, ChartNoAxesCombined } from "lucide-react";
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
  const months = Object.entries(monthlyData).slice(-8);
  const maxVal = Math.max(...months.flatMap(([, v]) => [v.income, v.expense]), 1);

  return (
    <div className="grid gap-3 xl:grid-cols-[1.25fr_0.75fr]">
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className="neo-card overflow-hidden p-3 sm:p-4 lg:p-5"
      >
        <div className="mb-3 sm:mb-4 flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-muted-foreground">Rendimiento</p>
            <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-extrabold tracking-tight text-foreground">Balance general</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">Una lectura más clara de ingresos, gastos y resultado neto.</p>
          </div>
          <div className="neo-card-sm flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 flex-shrink-0">
            <div className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full flex-shrink-0 ${balance >= 0 ? "bg-secondary" : "bg-destructive"}`} />
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground">Estado</p>
              <p className="text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">{balance >= 0 ? "Saldo positivo" : "Saldo negativo"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
            {[
              { label: "Balance", value: balance, icon: CreditCard, tone: "gradient-blue" },
              { label: "Ingresos", value: totalIncome, icon: ArrowDownLeft, tone: "gradient-income" },
              { label: "Gastos", value: totalExpenses, icon: ArrowUpRight, tone: "gradient-expense" },
            ].map(({ label, value, icon: Icon, tone }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.08 }} className="neo-inset p-3 sm:p-4">
                <div className="mb-2 sm:mb-4 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground">{label}</span>
                  <div className={`${tone} flex h-7 w-7 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-primary-foreground`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>
                <p className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-foreground break-all">${fmt(value)}</p>
              </motion.div>
            ))}
          </div>

          <div className="neo-inset p-2.5 sm:p-3">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <ChartNoAxesCombined className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground">Pulso mensual</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">Comparativa rápida</p>
              </div>
            </div>

            <div className="flex h-28 sm:h-40 items-end gap-1.5 sm:gap-2">
              {months.length > 0 ? months.map(([month, vals], i) => (
                <div key={month} className="flex flex-1 items-end gap-0.5 sm:gap-1 min-w-0">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(vals.income / maxVal) * 100}%` }}
                    transition={{ delay: 0.55 + i * 0.05, duration: 0.45, ease: "easeOut" }}
                    className="gradient-income w-full min-w-[3px] rounded-t-lg sm:rounded-t-2xl opacity-95"
                    title={`${month}: ingresos $${fmt(vals.income)}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(vals.expense / maxVal) * 100}%` }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.45, ease: "easeOut" }}
                    className="gradient-expense w-full min-w-[3px] rounded-t-lg sm:rounded-t-2xl opacity-85"
                    title={`${month}: gastos $${fmt(vals.expense)}`}
                  />
                </div>
              )) : Array.from({ length: 6 }).map((_, i) => <div key={i} className="neo-card-sm h-8 flex-1" />)}
            </div>

            <div className="mt-3 sm:mt-4 flex items-center justify-between text-[9px] sm:text-[11px] text-muted-foreground">
              <span>{months.length === 0 ? "Sin datos aún" : "Últimos meses"}</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />Ingresos</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-destructive" />Gastos</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3 xl:grid-cols-1">
        {[
          { label: "Entrada total", value: totalIncome, helper: "Flujo acumulado", tone: "text-primary", bg: "gradient-income" },
          { label: "Salida total", value: totalExpenses, helper: "Egresos acumulados", tone: "text-destructive", bg: "gradient-expense" },
          { label: "Resultado neto", value: balance, helper: "Lo que realmente queda", tone: balance >= 0 ? "text-secondary" : "text-destructive", bg: balance >= 0 ? "gradient-balance" : "gradient-expense" },
        ].map((card, index) => (
          <motion.div key={card.label} custom={index + 1} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-3 sm:p-4">
            <div className={`${card.bg} mb-3 sm:mb-4 flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-primary-foreground shadow-[var(--shadow-floating)]`}>
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground">{card.label}</p>
            <p className={`mt-1.5 sm:mt-2 text-lg sm:text-2xl font-extrabold tracking-tight ${card.tone} break-all`}>${fmt(card.value)}</p>
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">{card.helper}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentWidgets;
