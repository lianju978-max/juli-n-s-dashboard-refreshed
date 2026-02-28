import { Search, ChevronDown, Wallet, BarChart3 } from "lucide-react";

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
    <div className="neo-card p-5 flex-1">
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
              <button
                key={f}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  i === 2 ? "gradient-blue text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main value */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-foreground">$43.20</span>
        <span className="text-sm text-muted-foreground ml-1">USD</span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-3 h-32 mb-5 px-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-0.5 w-full items-end h-24">
              <div
                className="flex-1 rounded-t-md gradient-blue"
                style={{ height: `${bar.values[0]}%` }}
              />
              <div
                className="flex-1 rounded-t-md bg-secondary/60"
                style={{ height: `${bar.values[1]}%` }}
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
          <button className="text-xs text-muted-foreground flex items-center gap-1">
            All <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2.5">
          {plans.map((plan) => (
            <div key={plan.name} className="neo-pressed flex items-center gap-3 p-3">
              <div className="w-8 h-8 rounded-lg gradient-blue-light flex items-center justify-center">
                <plan.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{plan.name}</p>
                <p className="text-[10px] text-muted-foreground">{plan.amount}</p>
              </div>
              <span className="text-xs font-semibold text-primary">{plan.trend}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityManager;
