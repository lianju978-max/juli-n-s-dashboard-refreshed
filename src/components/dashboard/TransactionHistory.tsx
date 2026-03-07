import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Filter, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactions, useDeleteTransaction } from "@/hooks/useFinanceData";
import EditTransactionDialog from "./EditTransactionDialog";
import { toast } from "sonner";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type FilterType = "all" | "income" | "expense";

const TransactionHistory = () => {
  const { data: transactions } = useTransactions();
  const deleteTransaction = useDeleteTransaction();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [filter, setFilter] = useState<FilterType>("all");
  const [editTx, setEditTx] = useState<any>(null);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      const matchMonth = d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      const matchType = filter === "all" || tx.type === filter;
      return matchMonth && matchType;
    });
  }, [transactions, selectedMonth, selectedYear, filter]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof filteredTransactions> = {};
    filteredTransactions.forEach((tx) => {
      const key = tx.date;
      if (!map[key]) map[key] = [];
      map[key].push(tx);
    });
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredTransactions]);

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);

  const goToPrev = () => {
    if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear((y) => y - 1); }
    else setSelectedMonth((m) => m - 1);
  };
  const goToNext = () => {
    if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear((y) => y + 1); }
    else setSelectedMonth((m) => m + 1);
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatDay = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("es", { weekday: "short", day: "numeric" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta transacción?")) return;
    try {
      await deleteTransaction.mutateAsync(id);
      toast.success("Transacción eliminada");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const VISIBLE_COUNT = 5;
  const allTxFlat = grouped.flatMap(([, txs]) => txs);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="neo-card flex flex-1 flex-col overflow-hidden p-3 sm:p-4 lg:p-5"
      >
        <div className="mb-3 sm:mb-4 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-muted-foreground">Movimientos</p>
            <h3 className="mt-1.5 sm:mt-2 text-base sm:text-xl font-extrabold tracking-tight text-foreground">Historial de registros</h3>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={goToPrev} className="neo-card-sm p-1.5 sm:p-2">
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </motion.button>
            <span className="min-w-[110px] sm:min-w-[140px] text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-foreground whitespace-nowrap">
              {MONTH_NAMES[selectedMonth]} {selectedYear}
            </span>
            <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={goToNext} className="neo-card-sm p-1.5 sm:p-2">
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        <div className="mb-3 sm:mb-4 flex gap-1.5 sm:gap-2">
          {([
            { key: "all", label: "Todos" },
            { key: "income", label: "Ingresos" },
            { key: "expense", label: "Gastos" },
          ] as { key: FilterType; label: string }[]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold transition-all ${
                filter === f.key
                  ? "gradient-blue text-primary-foreground shadow-[var(--shadow-floating)]"
                  : "neo-pressed text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mb-4 sm:mb-5 grid gap-2 sm:gap-3 grid-cols-3">
          <div className="neo-inset p-2 sm:p-3 text-center">
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground">Ingresos</p>
            <p className="mt-0.5 sm:mt-1 text-sm sm:text-lg font-extrabold text-primary truncate">${fmt(totalIncome)}</p>
          </div>
          <div className="neo-inset p-2 sm:p-3 text-center">
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground">Gastos</p>
            <p className="mt-0.5 sm:mt-1 text-sm sm:text-lg font-extrabold text-destructive truncate">${fmt(totalExpenses)}</p>
          </div>
          <div className="neo-inset p-2 sm:p-3 text-center">
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground">Balance</p>
            <p className={`mt-0.5 sm:mt-1 text-sm sm:text-lg font-extrabold truncate ${totalIncome - totalExpenses >= 0 ? "text-secondary" : "text-destructive"}`}>
              ${fmt(totalIncome - totalExpenses)}
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 pr-1">
          <AnimatePresence mode="wait">
            {grouped.length > 0 ? (
              <motion.div
                key={`${selectedMonth}-${selectedYear}-${filter}-${expanded}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3 sm:space-y-4"
              >
                {(() => {
                  let count = 0;
                  return grouped.map(([day, txs]) => {
                    if (!expanded && count >= VISIBLE_COUNT) return null;
                    const remainingSlots = expanded ? txs.length : VISIBLE_COUNT - count;
                    const visibleTxs = txs.slice(0, Math.max(0, remainingSlots));
                    count += visibleTxs.length;
                    if (visibleTxs.length === 0) return null;
                    return (
                      <div key={day}>
                        <p className="mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                          {formatDay(day)}
                        </p>
                        <div className="space-y-1.5 sm:space-y-2">
                          {visibleTxs.map((tx, i) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="neo-inset group flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-[1.15rem] p-2.5 sm:p-3"
                            >
                              <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl flex-shrink-0 ${tx.type === "income" ? "gradient-income" : "gradient-expense"}`}>
                                {tx.type === "income" ? (
                                  <ArrowDownLeft className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                                ) : (
                                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs sm:text-sm font-semibold text-foreground">
                                  {tx.description || (tx.type === "income" ? "Ingreso" : "Gasto")}
                                </p>
                                <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                                  {(tx as any).categories?.name ?? "Sin categoría"}
                                </p>
                              </div>
                              <span className={`text-xs sm:text-sm font-extrabold flex-shrink-0 ${tx.type === "income" ? "text-primary" : "text-destructive"}`}>
                                {tx.type === "income" ? "+" : "-"}${fmt(Number(tx.amount))}
                              </span>
                              <div className="flex flex-shrink-0 gap-0.5 sm:gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <button onClick={() => setEditTx(tx)} className="rounded-lg p-1 sm:p-1.5 hover:bg-accent transition-colors">
                                  <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                                </button>
                                <button onClick={() => handleDelete(tx.id)} className="rounded-lg p-1 sm:p-1.5 hover:bg-destructive/10 transition-colors">
                                  <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-destructive" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                <Filter className="mb-2 sm:mb-3 h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/40" />
                <p className="text-xs sm:text-sm text-muted-foreground">No hay registros en {MONTH_NAMES[selectedMonth]} {selectedYear}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 sm:mt-4 border-t border-border/70 pt-3 sm:pt-4 flex flex-col items-center gap-2">
          {allTxFlat.length > VISIBLE_COUNT && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpanded(!expanded)}
              className="neo-pressed px-4 py-2 text-[10px] sm:text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl"
            >
              {expanded ? "Ver menos" : `Ver más (${allTxFlat.length - VISIBLE_COUNT} restantes)`}
            </motion.button>
          )}
          <p className="text-center text-[10px] sm:text-[11px] text-muted-foreground">
            {filteredTransactions.length} registro{filteredTransactions.length !== 1 ? "s" : ""} en {MONTH_NAMES[selectedMonth]}
          </p>
        </div>
      </motion.div>

      <EditTransactionDialog open={!!editTx} onClose={() => setEditTx(null)} transaction={editTx} />
    </>
  );
};

export default TransactionHistory;
