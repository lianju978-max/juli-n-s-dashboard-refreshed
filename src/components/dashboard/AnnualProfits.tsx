const AnnualProfits = () => {
  const radius1 = 70;
  const radius2 = 55;
  const radius3 = 40;
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;

  return (
    <div className="neo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground">Annual Profits</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground">•••</button>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Outer ring */}
            <circle cx="90" cy="90" r={radius1} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <circle
              cx="90" cy="90" r={radius1} fill="none"
              stroke="url(#blueGrad1)" strokeWidth="12"
              strokeDasharray={circumference1}
              strokeDashoffset={circumference1 * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
            {/* Middle ring */}
            <circle cx="90" cy="90" r={radius2} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <circle
              cx="90" cy="90" r={radius2} fill="none"
              stroke="url(#blueGrad2)" strokeWidth="12"
              strokeDasharray={circumference2}
              strokeDashoffset={circumference2 * 0.4}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
            {/* Inner ring */}
            <circle cx="90" cy="90" r={radius3} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <circle
              cx="90" cy="90" r={radius3} fill="none"
              stroke="url(#blueGrad3)" strokeWidth="12"
              strokeDasharray={circumference3}
              strokeDashoffset={circumference3 * 0.55}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
            <defs>
              <linearGradient id="blueGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(211, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(200, 100%, 60%)" />
              </linearGradient>
              <linearGradient id="blueGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(200, 100%, 60%)" />
                <stop offset="100%" stopColor="hsl(177, 69%, 50%)" />
              </linearGradient>
              <linearGradient id="blueGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(177, 69%, 41%)" />
                <stop offset="100%" stopColor="hsl(190, 80%, 55%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-foreground">$14K</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>
      </div>

      <div className="flex justify-around text-center">
        <div>
          <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-sm font-bold text-foreground">$9.3K</p>
        </div>
        <div>
          <div className="w-2 h-2 rounded-full bg-secondary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Expenses</p>
          <p className="text-sm font-bold text-foreground">$4.7K</p>
        </div>
      </div>
    </div>
  );
};

export default AnnualProfits;
