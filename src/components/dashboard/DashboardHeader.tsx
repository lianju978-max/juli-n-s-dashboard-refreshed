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
      className="neo-card relative z-10 mx-2 overflow-hidden px-4 py-4 sm:mx-4 sm:px-6 sm:py-5 lg:mx-6"
    >
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="neo-card-sm p-2.5 text-foreground transition-opacity"
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 4, scale: 1.05 }}
                className="gradient-blue flex h-11 w-11 items-center justify-center rounded-2xl shadow-[var(--shadow-floating)]"
              >
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Panel financiero</p>
                <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">Hola, {displayName}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="neo-pressed px-3 py-1.5 font-medium text-foreground">Vista general</span>
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 font-medium text-muted-foreground">
                Últimos movimientos y metas
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="neo-card-sm p-2.5 text-muted-foreground"
          >
            <Bell className="h-4 w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddTransaction}
            className="gradient-blue flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-floating)]"
          >
            <Plus className="h-4 w-4" />
            Agregar transacción
          </motion.button>

          <div className="neo-card-sm flex items-center gap-3 px-3 py-2.5">
            <div className="text-right">
              <p className="text-sm font-semibold capitalize text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">Cuenta personal</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="gradient-blue flex h-10 w-10 items-center justify-center rounded-2xl">
              <span className="text-sm font-bold text-primary-foreground">{displayName.slice(0, 2).toUpperCase()}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={signOut}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;

