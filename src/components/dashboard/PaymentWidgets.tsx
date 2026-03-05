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
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className="neo-card overflow-hidden p-5 sm:p-6"
      >
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Rendimiento</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">Balance general</h3>
            <p className="mt-2 text-sm text-muted-foreground">Una lectura más clara de ingresos, gastos y resultado neto.</p>
          </div>
          <div className="neo-card-sm flex items-center gap-3 px-4 py-3">
            <div className={`h-2.5 w-2.5 rounded-full ${balance >= 0 ? "bg-secondary" : "bg-destructive"}`} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Estado</p>
              <p className="text-sm font-bold text-foreground">{balance >= 0 ? "Saldo positivo" : "Saldo negativo"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Balance", value: balance, icon: CreditCard, tone: "gradient-blue" },
              { label: "Ingresos", value: totalIncome, icon: ArrowDownLeft, tone: "gradient-income" },
              { label: "Gastos", value: totalExpenses, icon: ArrowUpRight, tone: "gradient-expense" },
            ].map(({ label, value, icon: Icon, tone }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.08 }} className="neo-inset p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                  <div className={`${tone} flex h-9 w-9 items-center justify-center rounded-2xl text-primary-foreground`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">${fmt(value)}</p>
              </motion.div>
            ))}
          </div>

          <div className="neo-inset p-4">
            <div className="mb-4 flex items-center gap-2">
              <ChartNoAxesCombined className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pulso mensual</p>
                <p className="text-sm font-bold text-foreground">Comparativa rápida</p>
              </div>
            </div>

            <div className="flex h-40 items-end gap-2">
              {months.length > 0 ? months.map(([month, vals], i) => (
                <div key={month} className="flex flex-1 items-end gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(vals.income / maxVal) * 100}%` }}
                    transition={{ delay: 0.55 + i * 0.05, duration: 0.45, ease: "easeOut" }}
                    className="gradient-income w-full rounded-t-2xl opacity-95"
                    title={`${month}: ingresos $${fmt(vals.income)}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(vals.expense / maxVal) * 100}%` }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.45, ease: "easeOut" }}
                    className="gradient-expense w-full rounded-t-2xl opacity-85"
                    title={`${month}: gastos $${fmt(vals.expense)}`}
                  />
                </div>
              )) : Array.from({ length: 6 }).map((_, i) => <div key={i} className="neo-card-sm h-8 flex-1" />)}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{months.length === 0 ? "Sin datos aún" : "Últimos meses"}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />Ingresos</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" />Gastos</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
        {[
          { label: "Entrada total", value: totalIncome, helper: "Flujo acumulado", tone: "text-primary", bg: "gradient-income" },
          { label: "Salida total", value: totalExpenses, helper: "Egresos acumulados", tone: "text-destructive", bg: "gradient-expense" },
          { label: "Resultado neto", value: balance, helper: "Lo que realmente queda", tone: balance >= 0 ? "text-secondary" : "text-destructive", bg: balance >= 0 ? "gradient-balance" : "gradient-expense" },
        ].map((card, index) => (
          <motion.div key={card.label} custom={index + 1} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-5">
            <div className={`${card.bg} mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-floating)]`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{card.label}</p>
            <p className={`mt-2 text-2xl font-extrabold tracking-tight ${card.tone}`}>${fmt(card.value)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.helper}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentWidgets;

