import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

interface Props {
  onAddTransaction: () => void;
}

const TaskSection = ({ onAddTransaction }: Props) => {
  const now = new Date();
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const days = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + 1 + i);
    return {
      day: dayNames[d.getDay()],
      num: d.getDate(),
      active: d.toDateString() === now.toDateString(),
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4"
    >
      {/* Calendar widget */}
      <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }} className="neo-card p-4 sm:p-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <motion.button whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }} className="p-1"><ChevronLeft className="w-4 h-4 text-muted-foreground" /></motion.button>
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            {dayNames[now.getDay()]}, {monthNames[now.getMonth()]} {now.getDate()}
          </span>
          <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }} className="p-1"><ChevronRight className="w-4 h-4 text-muted-foreground" /></motion.button>
        </div>
        <motion.div variants={container} initial="hidden" animate="show" className="flex gap-1.5 sm:gap-2 overflow-x-auto">
          {days.map((d) => (
            <motion.div
              key={d.day}
              variants={item}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl cursor-pointer transition-colors flex-shrink-0 ${
                d.active ? "gradient-blue text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-medium ${d.active ? "text-primary-foreground" : "text-muted-foreground"}`}>{d.day}</span>
              <span className={`text-xs sm:text-sm font-bold ${d.active ? "text-primary-foreground" : "text-foreground"}`}>{d.num}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Add transaction button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={onAddTransaction}
        className="neo-card flex-1 gradient-blue flex items-center justify-center gap-2 sm:gap-3 group py-4 sm:py-0"
      >
        <Plus className="w-5 h-5 text-primary-foreground" />
        <span className="text-primary-foreground font-semibold text-sm sm:text-lg">Agregar Transacción</span>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </motion.div>
      </motion.button>

      {/* Calendar icon button - hidden on mobile */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="neo-card p-5 items-center justify-center flex-shrink-0 hidden sm:flex"
      >
        <Calendar className="w-6 h-6 text-primary" />
      </motion.button>
    </motion.div>
  );
};

export default TaskSection;
