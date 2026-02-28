import { Lock, TrendingUp, Wallet, Star } from "lucide-react";

const RightSideWidgets = () => {
  return (
    <div className="flex flex-col gap-4 w-72 flex-shrink-0">
      {/* System Lock */}
      <div className="neo-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">System Lock</span>
          </div>
          <button className="text-muted-foreground text-xs">•••</button>
        </div>
        {/* Countdown */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">13</p>
            <p className="text-[10px] text-muted-foreground">Days</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">109</p>
            <p className="text-[10px] text-muted-foreground">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">23</p>
            <p className="text-[10px] text-muted-foreground">Minutes</p>
          </div>
        </div>
        {/* Dotted progress */}
        <div className="flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < 13 ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* Growth Rate */}
      <div className="neo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-foreground">Growth rate</span>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="24" fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="6" />
              <circle
                cx="30" cy="30" r="24" fill="none"
                stroke="hsl(211, 100%, 50%)" strokeWidth="6"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * 0.64}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">36%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">36%</p>
            <p className="text-[10px] text-muted-foreground">Growth rate</p>
          </div>
        </div>
      </div>

      {/* Stocks */}
      <div className="neo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-foreground">Stocks</span>
          <span className="text-xs font-bold text-primary">+ 9.3%</span>
        </div>
        <p className="text-lg font-bold text-foreground mb-3">$ 16,073.49</p>
        {/* Line chart */}
        <svg viewBox="0 0 240 60" className="w-full h-12">
          <defs>
            <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 Q30,40 50,35 T100,25 T150,30 T200,15 T240,20"
            fill="none" stroke="hsl(211, 100%, 50%)" strokeWidth="2"
          />
          <path
            d="M0,45 Q30,40 50,35 T100,25 T150,30 T200,15 T240,20 L240,60 L0,60 Z"
            fill="url(#stockGrad)"
          />
        </svg>
      </div>

      {/* Wallet Verification */}
      <div className="neo-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Business plans</span>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">Verify your wallet to unlock all features and benefits.</p>
        <button className="w-full gradient-blue text-primary-foreground text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          Enable
        </button>
      </div>

      {/* Review Rating */}
      <div className="neo-card p-4">
        <span className="text-xs font-bold text-foreground block mb-2">Review rating</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-primary fill-primary" : "text-muted"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">4.0</span>
        </div>
        <div className="flex gap-1 mt-2">
          {["😊", "😄", "🙂", "😐", "😕"].map((e, i) => (
            <span key={i} className={`text-lg ${i === 0 ? "opacity-100" : "opacity-40"}`}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideWidgets;
