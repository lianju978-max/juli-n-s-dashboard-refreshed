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
      <DialogContent className="neo-card max-h-[88vh] w-[96vw] max-w-4xl overflow-y-auto border-border/60 p-0">
        <div className="border-b border-border/70 px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold tracking-tight text-foreground">Detalle financiero</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm text-muted-foreground">Visualiza la evolución mensual de ingresos y gastos con más contraste y contexto.</p>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="neo-inset p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Total Ingresos</p>
              <p className="mt-1 text-lg font-extrabold text-primary">{fmt(totals.income)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="neo-inset p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Total Gastos</p>
              <p className="mt-1 text-lg font-extrabold text-destructive">{fmt(totals.expense)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="neo-inset p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Balance</p>
              <p className={`mt-1 text-lg font-extrabold ${totals.balance >= 0 ? "text-secondary" : "text-destructive"}`}>{fmt(totals.balance)}</p>
            </motion.div>
          </div>

          <Tabs defaultValue="bars" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 rounded-2xl bg-accent/70 p-1">
              <TabsTrigger value="bars" className="rounded-xl text-xs">Barras</TabsTrigger>
              <TabsTrigger value="area" className="rounded-xl text-xs">Área</TabsTrigger>
            </TabsList>

            <TabsContent value="bars" className="mt-0">
              <div className="neo-inset h-[320px] rounded-[1.4rem] p-4 sm:h-[380px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} width={50} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend formatter={(v) => (v === "income" ? "Ingresos" : "Gastos")} wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="income" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} maxBarSize={34} />
                      <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[10, 10, 0, 0]} maxBarSize={34} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sin datos disponibles</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="area" className="mt-0">
              <div className="neo-inset h-[320px] rounded-[1.4rem] p-4 sm:h-[380px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} width={50} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend formatter={(v) => (v === "income" ? "Ingresos" : "Gastos")} wrapperStyle={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="income" stroke="hsl(var(--primary))" fill="url(#incomeGrad)" strokeWidth={3} />
                      <Area type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" fill="url(#expenseGrad)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sin datos disponibles</div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {chartData.length > 0 && (
            <div className="overflow-x-auto rounded-[1.4rem] border border-border/60 bg-background/50 p-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/70">
                    <th className="py-3 text-left font-medium text-muted-foreground">Mes</th>
                    <th className="py-3 text-right font-medium text-muted-foreground">Ingresos</th>
                    <th className="py-3 text-right font-medium text-muted-foreground">Gastos</th>
                    <th className="py-3 text-right font-medium text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((row) => (
                    <tr key={row.sortKey} className="border-b border-border/40 transition-colors hover:bg-accent/50">
                      <td className="py-3 font-semibold text-foreground">{row.month}</td>
                      <td className="py-3 text-right font-semibold text-primary">{fmt(row.income)}</td>
                      <td className="py-3 text-right font-semibold text-destructive">{fmt(row.expense)}</td>
                      <td className={`py-3 text-right font-extrabold ${row.income - row.expense >= 0 ? "text-secondary" : "text-destructive"}`}>
                        {fmt(row.income - row.expense)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialDetailDialog;
