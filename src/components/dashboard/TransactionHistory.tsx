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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="neo-card p-5 flex-1 flex flex-col"
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-foreground">Historial de Registros</h3>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goToPrev} className="neo-pressed p-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.button>
            <span className="text-xs font-semibold text-foreground min-w-[120px] text-center">
              {MONTH_NAMES[selectedMonth]} {selectedYear}
            </span>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goToNext} className="neo-pressed p-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-4">
          {([
            { key: "all", label: "Todos" },
            { key: "income", label: "Ingresos" },
            { key: "expense", label: "Gastos" },
          ] as { key: FilterType; label: string }[]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                filter === f.key
                  ? "gradient-blue text-primary-foreground"
                  : "neo-pressed text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Monthly summary */}
        <div className="flex gap-3 mb-4">
          <div className="neo-pressed flex-1 p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Ingresos</p>
            <p className="text-sm font-bold text-primary">${fmt(totalIncome)}</p>
          </div>
          <div className="neo-pressed flex-1 p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Gastos</p>
            <p className="text-sm font-bold text-destructive">${fmt(totalExpenses)}</p>
          </div>
          <div className="neo-pressed flex-1 p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Balance</p>
            <p className={`text-sm font-bold ${totalIncome - totalExpenses >= 0 ? "text-primary" : "text-destructive"}`}>
              ${fmt(totalIncome - totalExpenses)}
            </p>
          </div>
        </div>

        {/* Transaction list */}
        <div className="flex-1 overflow-y-auto max-h-[320px] space-y-3 pr-1">
          <AnimatePresence mode="wait">
            {grouped.length > 0 ? (
              <motion.div
                key={`${selectedMonth}-${selectedYear}-${filter}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3"
              >
                {grouped.map(([day, txs]) => (
                  <div key={day}>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">
                      {formatDay(day)}
                    </p>
                    <div className="space-y-1.5">
                      {txs.map((tx, i) => (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="neo-pressed flex items-center gap-3 p-2.5 group"
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            tx.type === "income" ? "gradient-blue-light" : "bg-destructive/10"
                          }`}>
                            {tx.type === "income" ? (
                              <ArrowDownLeft className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <ArrowUpRight className="w-3.5 h-3.5 text-destructive" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">
                              {tx.description || (tx.type === "income" ? "Ingreso" : "Gasto")}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {(tx as any).categories?.name ?? "Sin categoría"}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold flex-shrink-0 ${
                            tx.type === "income" ? "text-primary" : "text-destructive"
                          }`}>
                            {tx.type === "income" ? "+" : "-"}${fmt(Number(tx.amount))}
                          </span>
                          {/* Edit/Delete buttons */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <button onClick={() => setEditTx(tx)} className="p-1 rounded-md hover:bg-accent transition-colors">
                              <Pencil className="w-3 h-3 text-muted-foreground" />
                            </button>
                            <button onClick={() => handleDelete(tx.id)} className="p-1 rounded-md hover:bg-destructive/10 transition-colors">
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                <Filter className="w-8 h-8 text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground">No hay registros en {MONTH_NAMES[selectedMonth]} {selectedYear}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            {filteredTransactions.length} registro{filteredTransactions.length !== 1 ? "s" : ""} en {MONTH_NAMES[selectedMonth]}
          </p>
        </div>
      </motion.div>

      <EditTransactionDialog open={!!editTx} onClose={() => setEditTx(null)} transaction={editTx} />
    </>
  );
};

export default TransactionHistory;
