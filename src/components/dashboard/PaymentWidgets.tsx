import { CreditCard, ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";

const PaymentWidgets = () => {
  return (
    <div className="flex gap-4">
      {/* VISA Card */}
      <div className="neo-card p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-foreground">VISA</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-1">Card number</p>
        <p className="text-sm font-semibold text-foreground mb-4 tracking-widest">**** **** **** 2719</p>

        <div className="flex gap-3 mb-4">
          <button className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowDownLeft className="w-3.5 h-3.5 text-primary" />
            Receive
          </button>
          <button className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            Send
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Regular fee</p>
            <p className="text-sm font-bold text-foreground">$. 25.00</p>
          </div>
          <button className="text-xs font-medium text-teal hover:underline">Edit card limitation</button>
        </div>
      </div>

      {/* Income/Paid */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Total Income */}
        <div className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Income</span>
            <button className="neo-pressed px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">
              Weekly <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <p className="text-2xl font-bold text-foreground">$23,194.80</p>
        </div>

        {/* Total Paid */}
        <div className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Paid</span>
            <button className="neo-pressed px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">
              Weekly <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <p className="text-2xl font-bold text-foreground">$8,145.20</p>
        </div>
      </div>

      {/* View on chart */}
      <div className="neo-card p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Statistics overview</p>
          <p className="text-sm font-semibold text-foreground mb-3">Revenue comparison</p>
        </div>
        {/* Mini chart placeholder */}
        <div className="flex items-end gap-1 h-16 mb-3">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm gradient-blue opacity-70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <button className="text-xs font-medium text-teal hover:underline text-center">View on chart mode</button>
      </div>
    </div>
  );
};

export default PaymentWidgets;
