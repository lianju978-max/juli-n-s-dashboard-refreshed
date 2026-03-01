import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Tables } from "@/integrations/supabase/types";

type Transaction = Tables<"transactions">;
type Category = Tables<"categories">;
type SavingsGoal = Tables<"savings_goals">;

export const useTransactions = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*, categories(name, icon, color)")
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCategories = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["categories", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useSavingsGoals = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["savings_goals", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("savings_goals")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (tx: { type: string; amount: number; description?: string; date: string; category_id?: string }) => {
      const { data, error } = await supabase
        .from("transactions")
        .insert({ ...tx, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (cat: { name: string; type: string; icon?: string; color?: string }) => {
      const { data, error } = await supabase
        .from("categories")
        .insert({ ...cat, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};

export const useAddSavingsGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (goal: { name: string; target_amount: number; current_amount?: number; deadline?: string }) => {
      const { data, error } = await supabase
        .from("savings_goals")
        .insert({ ...goal, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savings_goals"] }),
  });
};

export const useUpdateSavingsGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, current_amount }: { id: string; current_amount: number }) => {
      const { data, error } = await supabase
        .from("savings_goals")
        .update({ current_amount })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savings_goals"] }),
  });
};

export const useFinanceSummary = () => {
  const { data: transactions } = useTransactions();

  const totalIncome = transactions?.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0) ?? 0;
  const totalExpenses = transactions?.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0) ?? 0;
  const balance = totalIncome - totalExpenses;

  // Monthly breakdown
  const monthlyData = transactions?.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("en", { month: "short" });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][t.type as "income" | "expense"] += Number(t.amount);
    return acc;
  }, {} as Record<string, { income: number; expense: number }>) ?? {};

  return { totalIncome, totalExpenses, balance, monthlyData, transactions };
};
