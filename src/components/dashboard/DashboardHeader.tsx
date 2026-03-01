import { Menu, Search, Mic, Plus, HelpCircle, LogOut } from "lucide-react";
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
      className="flex items-center justify-between px-6 py-4"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="neo-card-sm p-2.5 hover:opacity-80 transition-opacity"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </motion.button>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="gradient-blue w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <span className="text-primary-foreground font-bold text-sm">Nº</span>
          </motion.div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">Julián dashboard</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="neo-card-sm px-4 py-2.5 flex items-center gap-2 max-w-xs"
        >
          <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">Hey, Need help? Just ask me anything!</span>
        </motion.div>

        <div className="neo-card-sm flex items-center gap-2 px-3 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground" />
        </div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="neo-card-sm p-2.5 transition-opacity">
          <Mic className="w-4 h-4 text-muted-foreground" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAddTransaction}
          className="gradient-blue p-2.5 rounded-xl transition-opacity"
        >
          <Plus className="w-4 h-4 text-primary-foreground" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center gap-3 ml-2"
        >
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground capitalize">{displayName}</p>
            <p className="text-xs text-muted-foreground">Personal Finance</p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-xl overflow-hidden neo-card-sm">
            <div className="w-full h-full gradient-blue flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">{displayName.slice(0, 2).toUpperCase()}</span>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={signOut}
            className="neo-card-sm p-2 transition-opacity"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
