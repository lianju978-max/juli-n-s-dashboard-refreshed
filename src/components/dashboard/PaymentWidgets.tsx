import { CreditCard, ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const PaymentWidgets = () => {
  return (
    <div className="flex gap-4">
      {/* VISA Card */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="neo-card p-5 flex-1">
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
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowDownLeft className="w-3.5 h-3.5 text-primary" /> Receive
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="neo-pressed flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
            <ArrowUpRight className="w-3.5 h-3.5 text-primary" /> Send
          </motion.button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Regular fee</p>
            <p className="text-sm font-bold text-foreground">$. 25.00</p>
          </div>
          <button className="text-xs font-medium text-teal hover:underline">Edit card limitation</button>
        </div>
      </motion.div>

      {/* Income/Paid */}
      <div className="flex-1 flex flex-col gap-4">
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Income</span>
            <button className="neo-pressed px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">Weekly <ChevronDown className="w-3 h-3" /></button>
          </div>
          <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }} className="text-2xl font-bold text-foreground">$23,194.80</motion.p>
        </motion.div>
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3 }} className="neo-card p-5 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Total Paid</span>
            <button className="neo-pressed px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">Weekly <ChevronDown className="w-3 h-3" /></button>
          </div>
          <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="text-2xl font-bold text-foreground">$8,145.20</motion.p>
        </motion.div>
      </div>

      {/* View on chart */}
      <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -4 }} className="neo-card p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Statistics overview</p>
          <p className="text-sm font-semibold text-foreground mb-3">Revenue comparison</p>
        </div>
        <div className="flex items-end gap-1 h-16 mb-3">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="flex-1 rounded-t-sm gradient-blue opacity-70"
            />
          ))}
        </div>
        <button className="text-xs font-medium text-teal hover:underline text-center">View on chart mode</button>
      </motion.div>
    </div>
  );
};

export default PaymentWidgets;
