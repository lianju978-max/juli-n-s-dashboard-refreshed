import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("¡Bienvenido de vuelta!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Revisa tu correo para confirmar tu cuenta.");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="gradient-blue w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Nº</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Julián Dashboard</h1>
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-1">
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {isLogin ? "Ingresa tus credenciales para acceder" : "Regístrate para empezar a gestionar tus finanzas"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1.5">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground block mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full neo-pressed px-4 py-2.5 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full gradient-blue text-primary-foreground font-semibold py-2.5 rounded-xl text-sm disabled:opacity-50"
          >
            {loading ? "Cargando..." : isLogin ? "Entrar" : "Crear cuenta"}
          </motion.button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
