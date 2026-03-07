import { ChevronLeft, ChevronRight, Calendar, Plus, ArrowUpRight } from "lucide-react";
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
      className="grid gap-4 xl:grid-cols-[1.35fr_0.75fr]"
    >
      <div className="neo-card overflow-hidden p-4 sm:p-5 lg:p-6">
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-xl">
            <p className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground">Centro de control</p>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              Tu panorama financiero de {monthNames[now.getMonth()]}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">Revisa movimientos, detecta tendencias y registra nuevas transacciones desde un solo lugar.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            onClick={onAddTransaction}
            className="gradient-blue inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-[1.4rem] px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[var(--shadow-floating)] whitespace-nowrap flex-shrink-0"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Nueva transacción
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </motion.button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="neo-inset p-3 sm:p-4 lg:p-5">
            <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-muted-foreground">Semana actual</p>
                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{dayNames[now.getDay()]}, {now.getDate()} de {monthNames[now.getMonth()]}</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <motion.button whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }} className="neo-card-sm p-1.5 sm:p-2 text-muted-foreground"><ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></motion.button>
                <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }} className="neo-card-sm p-1.5 sm:p-2 text-muted-foreground"><ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></motion.button>
              </div>
            </div>

            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-1.5 sm:gap-2 sm:grid-cols-6">
              {days.map((d) => (
                <motion.div
                  key={`${d.day}-${d.num}`}
                  variants={item}
                  whileHover={{ y: -3 }}
                  className={`rounded-xl sm:rounded-[1.2rem] px-2 py-3 sm:px-3 sm:py-4 text-center transition-all ${d.active ? "gradient-blue text-primary-foreground shadow-[var(--shadow-floating)]" : "neo-card-sm text-foreground"}`}
                >
                  <p className={`text-[9px] sm:text-[11px] font-medium ${d.active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{d.day}</p>
                  <p className="mt-0.5 sm:mt-1 text-sm sm:text-lg font-bold">{d.num}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="neo-card-sm p-3 sm:p-4">
              <div className="mb-2 sm:mb-3 flex items-center gap-2 text-primary">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em]">Agenda</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-foreground">Ordena tus registros</p>
              <p className="mt-1 text-[11px] sm:text-xs leading-4 sm:leading-5 text-muted-foreground">Mantén el control diario de ingresos y gastos sin salir del dashboard.</p>
            </div>

            <div className="neo-card-sm p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground">Enfoque</p>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base font-bold text-foreground">Ahorro y visibilidad</p>
              <p className="mt-1 text-[11px] sm:text-xs leading-4 sm:leading-5 text-muted-foreground">El layout prioriza lectura rápida, contraste y acciones clave.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskSection;
