import { Menu, Plus, LogOut, Bell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onAddTransaction: () => void;
}

const DashboardHeader = ({ onAddTransaction }: Props) => {
  const { user, signOut } = useAuth();
  const displayName = user?.email?.split("@")[0] ?? "Usuario";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="neo-card relative z-10 mx-2 overflow-hidden px-3 py-3 sm:mx-4 sm:px-5 sm:py-4 lg:mx-6 lg:px-6 lg:py-5"
    >
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />
      <div className="relative flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="neo-card-sm flex-shrink-0 p-2 sm:p-2.5 text-foreground transition-opacity"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>

          <div className="min-w-0 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ rotate: 4, scale: 1.05 }}
                className="gradient-blue flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl shadow-[var(--shadow-floating)]"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </motion.div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-muted-foreground truncate">Panel financiero</p>
                <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-foreground truncate">Hola, {displayName}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
              <span className="neo-pressed px-2 py-1 sm:px-3 sm:py-1.5 font-medium text-foreground whitespace-nowrap">Vista general</span>
              <span className="rounded-full border border-border/70 bg-background/70 px-2 py-1 sm:px-3 sm:py-1.5 font-medium text-muted-foreground truncate">
                Últimos movimientos y metas
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-2 sm:gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="neo-card-sm flex-shrink-0 p-2 sm:p-2.5 text-muted-foreground"
          >
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddTransaction}
            className="gradient-blue flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[var(--shadow-floating)] whitespace-nowrap"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Agregar</span> transacción
          </motion.button>

          <div className="neo-card-sm flex items-center gap-2 sm:gap-3 px-2 py-2 sm:px-3 sm:py-2.5">
            <div className="text-right min-w-0 hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold capitalize text-foreground truncate max-w-[100px]">{displayName}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Cuenta personal</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="gradient-blue flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm font-bold text-primary-foreground">{displayName.slice(0, 2).toUpperCase()}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={signOut}
              className="flex-shrink-0 rounded-lg sm:rounded-xl p-1.5 sm:p-2 text-muted-foreground transition-colors hover:bg-accent"
              title="Cerrar sesión"
            >
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
