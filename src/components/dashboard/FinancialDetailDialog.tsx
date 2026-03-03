import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { useFinanceSummary } from "@/hooks/useFinanceData";
import { motion } from "framer-motion";

const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LABELS: Record<string, string> = {
  Jan: "Ene", Feb: "Feb", Mar: "Mar", Apr: "Abr", May: "May", Jun: "Jun",
  Jul: "Jul", Aug: "Ago", Sep: "Sep", Oct: "Oct", Nov: "Nov", Dec: "Dic",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const FinancialDetailDialog = ({ open, onClose }: Props) => {
  const { transactions } = useFinanceSummary();

  const chartData = useMemo(() => {
    if (!transactions?.length) return [];

    const map: Record<string, { month: string; monthLabel: string; income: number; expense: number; sortKey: string }> = {};

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const year = d.getFullYear();
      const monthIdx = d.getMonth();
      const monthKey = MONTH_ORDER[monthIdx];
      const key = `${year}-${String(monthIdx).padStart(2, "0")}`;

      if (!map[key]) {
        map[key] = {
          month: `${MONTH_LABELS[monthKey]} ${year}`,
          monthLabel: MONTH_LABELS[monthKey],
          income: 0,
          expense: 0,
          sortKey: key,
        };
      }
      if (t.type === "income") map[key].income += Number(t.amount);
      else if (t.type === "expense") map[key].expense += Number(t.amount);
    });

    return Object.values(map).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }, [transactions]);

  const totals = useMemo(() => {
    const income = chartData.reduce((s, d) => s + d.income, 0);
    const expense = chartData.reduce((s, d) => s + d.expense, 0);
    return { income, expense, balance: income - expense };
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="neo-card p-3 text-xs shadow-lg border border-border/50">
        <p className="font-semibold text-foreground mb-1.5">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
            {p.dataKey === "income" ? "Ingresos" : "Gastos"}: {fmt(p.value)}
          </p>
        ))}
        {payload.length === 2 && (
          <p className="mt-1 pt-1 border-t border-border/50 font-semibold text-foreground">
            Balance: {fmt(payload[0].value - payload[1].value)}
          </p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-y-auto neo-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Detalle Financiero</DialogTitle>
        </DialogHeader>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="neo-pressed p-3 text-center">
            <p className="text-[10px] text-muted-foreground">Total Ingresos</p>
            <p className="text-sm font-bold text-primary">{fmt(totals.income)}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="neo-pressed p-3 text-center">
            <p className="text-[10px] text-muted-foreground">Total Gastos</p>
            <p className="text-sm font-bold text-destructive">{fmt(totals.expense)}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="neo-pressed p-3 text-center">
            <p className="text-[10px] text-muted-foreground">Balance</p>
            <p className={`text-sm font-bold ${totals.balance >= 0 ? "text-primary" : "text-destructive"}`}>{fmt(totals.balance)}</p>
          </motion.div>
        </div>

        <Tabs defaultValue="bars" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="bars" className="flex-1 text-xs">Barras</TabsTrigger>
            <TabsTrigger value="area" className="flex-1 text-xs">Área</TabsTrigger>
          </TabsList>

          <TabsContent value="bars">
            <div className="h-[300px] sm:h-[350px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(v) => (v === "income" ? "Ingresos" : "Gastos")} wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">Sin datos disponibles</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="area">
            <div className="h-[300px] sm:h-[350px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(v) => (v === "income" ? "Ingresos" : "Gastos")} wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="income" stroke="hsl(var(--primary))" fill="url(#incomeGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" fill="url(#expenseGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">Sin datos disponibles</div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Monthly breakdown table */}
        {chartData.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Mes</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Ingresos</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Gastos</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row) => (
                  <tr key={row.sortKey} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-2 font-medium text-foreground">{row.month}</td>
                    <td className="py-2 text-right text-primary font-medium">{fmt(row.income)}</td>
                    <td className="py-2 text-right text-destructive font-medium">{fmt(row.expense)}</td>
                    <td className={`py-2 text-right font-bold ${row.income - row.expense >= 0 ? "text-primary" : "text-destructive"}`}>
                      {fmt(row.income - row.expense)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FinancialDetailDialog;
