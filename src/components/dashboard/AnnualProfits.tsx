import { motion } from "framer-motion";

const AnnualProfits = () => {
  const radius1 = 70;
  const radius2 = 55;
  const radius3 = 40;
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -4 }}
      className="neo-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground">Annual Profits</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground">•••</button>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Outer ring */}
            <circle cx="90" cy="90" r={radius1} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius1} fill="none"
              stroke="url(#blueGrad1)" strokeWidth="12"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              initial={{ strokeDasharray: circumference1, strokeDashoffset: circumference1 }}
              animate={{ strokeDashoffset: circumference1 * 0.25 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
            {/* Middle ring */}
            <circle cx="90" cy="90" r={radius2} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius2} fill="none"
              stroke="url(#blueGrad2)" strokeWidth="12"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              initial={{ strokeDasharray: circumference2, strokeDashoffset: circumference2 }}
              animate={{ strokeDashoffset: circumference2 * 0.4 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            />
            {/* Inner ring */}
            <circle cx="90" cy="90" r={radius3} fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius3} fill="none"
              stroke="url(#blueGrad3)" strokeWidth="12"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              initial={{ strokeDasharray: circumference3, strokeDashoffset: circumference3 }}
              animate={{ strokeDashoffset: circumference3 * 0.55 }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-lg font-bold text-foreground">$14K</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-around text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-sm font-bold text-foreground">$9.3K</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <div className="w-2 h-2 rounded-full bg-secondary mx-auto mb-1"></div>
          <p className="text-xs text-muted-foreground">Expenses</p>
          <p className="text-sm font-bold text-foreground">$4.7K</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnnualProfits;
