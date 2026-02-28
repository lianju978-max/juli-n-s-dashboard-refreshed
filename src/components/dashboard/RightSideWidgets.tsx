import { Lock, TrendingUp, Wallet, Star } from "lucide-react";
import { motion } from "framer-motion";

const widgetVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.45, ease: "easeOut" as const },
  }),
};

const RightSideWidgets = () => {
  return (
    <div className="flex flex-col gap-4 w-72 flex-shrink-0">
      {/* System Lock */}
      <motion.div custom={0} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">System Lock</span>
          </div>
          <button className="text-muted-foreground text-xs">•••</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[{ val: "13", label: "Days" }, { val: "109", label: "Hours" }, { val: "23", label: "Minutes" }].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-lg font-bold text-foreground">{t.val}</p>
              <p className="text-[10px] text-muted-foreground">{t.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8 + i * 0.03 }}
              className={`h-1.5 flex-1 rounded-full ${i < 13 ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Growth Rate */}
      <motion.div custom={1} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-foreground">Growth rate</span>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="24" fill="none" stroke="hsl(220, 14%, 92%)" strokeWidth="6" />
              <motion.circle
                cx="30" cy="30" r="24" fill="none"
                stroke="hsl(211, 100%, 50%)" strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDasharray: 2 * Math.PI * 24, strokeDashoffset: 2 * Math.PI * 24 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 24 * 0.64 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
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
      </motion.div>

      {/* Stocks */}
      <motion.div custom={2} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-foreground">Stocks</span>
          <span className="text-xs font-bold text-primary">+ 9.3%</span>
        </div>
        <p className="text-lg font-bold text-foreground mb-3">$ 16,073.49</p>
        <svg viewBox="0 0 240 60" className="w-full h-12">
          <defs>
            <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,45 Q30,40 50,35 T100,25 T150,30 T200,15 T240,20"
            fill="none" stroke="hsl(211, 100%, 50%)" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          />
          <motion.path
            d="M0,45 Q30,40 50,35 T100,25 T150,30 T200,15 T240,20 L240,60 L0,60 Z"
            fill="url(#stockGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* Wallet Verification */}
      <motion.div custom={3} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Business plans</span>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">Verify your wallet to unlock all features and benefits.</p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full gradient-blue text-primary-foreground text-xs font-semibold py-2.5 rounded-xl"
        >
          Enable
        </motion.button>
      </motion.div>

      {/* Review Rating */}
      <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-4">
        <span className="text-xs font-bold text-foreground block mb-2">Review rating</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.div key={s} whileHover={{ scale: 1.3, rotate: 10 }}>
              <Star className={`w-4 h-4 ${s <= 4 ? "text-primary fill-primary" : "text-muted"}`} />
            </motion.div>
          ))}
          <span className="text-xs text-muted-foreground ml-1">4.0</span>
        </div>
        <div className="flex gap-1 mt-2">
          {["😊", "😄", "🙂", "😐", "😕"].map((e, i) => (
            <motion.span key={i} whileHover={{ scale: 1.4 }} className={`text-lg cursor-pointer ${i === 0 ? "opacity-100" : "opacity-40"}`}>{e}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RightSideWidgets;
