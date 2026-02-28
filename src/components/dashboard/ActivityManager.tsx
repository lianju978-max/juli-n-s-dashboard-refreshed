import { Search, ChevronDown, Wallet, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const listItem = {
  hidden: { opacity: 0, x: -15 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.8 + i * 0.1, duration: 0.3 } as const,
  }),
};

const ActivityManager = () => {
  const bars = [
    { label: "Jan", values: [65, 45] },
    { label: "Feb", values: [50, 70] },
    { label: "Mar", values: [80, 55] },
    { label: "Apr", values: [45, 60] },
    { label: "May", values: [90, 40] },
    { label: "Jun", values: [55, 75] },
    { label: "Jul", values: [70, 50] },
    { label: "Aug", values: [85, 65] },
  ];

  const plans = [
    { icon: Wallet, name: "Investment Plan", amount: "$12,400", trend: "+5.2%" },
    { icon: BarChart3, name: "Savings Account", amount: "$8,230", trend: "+3.1%" },
    { icon: Wallet, name: "Trading Portfolio", amount: "$5,670", trend: "+7.8%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="neo-card p-5 flex-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Activity Manager</h3>
        <div className="flex items-center gap-3">
          <div className="neo-pressed flex items-center gap-2 px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input className="bg-transparent text-xs outline-none w-20 placeholder:text-muted-foreground" placeholder="Search..." />
          </div>
          <div className="flex gap-1 text-xs">
            {["Team", "Insights", "Today"].map((f, i) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  i === 2 ? "gradient-blue text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {f}
              </motion.button>
            ))}
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
        <span className="text-3xl font-bold text-foreground">$43.20</span>
        <span className="text-sm text-muted-foreground ml-1">USD</span>
      </motion.div>

      {/* Bar chart */}
      <div className="flex items-end gap-3 h-32 mb-5 px-2">
        {bars.map((bar, idx) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-0.5 w-full items-end h-24">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bar.values[0]}%` }}
                transition={{ delay: 0.4 + idx * 0.06, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scaleY: 1.1, originY: 1 }}
                className="flex-1 rounded-t-md gradient-blue"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bar.values[1]}%` }}
                transition={{ delay: 0.45 + idx * 0.06, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scaleY: 1.1, originY: 1 }}
                className="flex-1 rounded-t-md bg-secondary/60"
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Business plans list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-foreground">Business plans</h4>
          <button className="text-xs text-muted-foreground flex items-center gap-1">All <ChevronDown className="w-3 h-3" /></button>
        </div>
        <div className="space-y-2.5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              variants={listItem}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.02, x: 4 }}
              className="neo-pressed flex items-center gap-3 p-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg gradient-blue-light flex items-center justify-center">
                <plan.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{plan.name}</p>
                <p className="text-[10px] text-muted-foreground">{plan.amount}</p>
              </div>
              <span className="text-xs font-semibold text-primary">{plan.trend}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityManager;
