import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TaskSection from "@/components/dashboard/TaskSection";
import PaymentWidgets from "@/components/dashboard/PaymentWidgets";
import AnnualProfits from "@/components/dashboard/AnnualProfits";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import RightSideWidgets from "@/components/dashboard/RightSideWidgets";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import AddSavingsGoalDialog from "@/components/dashboard/AddSavingsGoalDialog";

const Index = () => {
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [showGoalDialog, setShowGoalDialog] = useState(false);

  return (
    <div className="dashboard-shell min-h-screen bg-background px-2 py-2 sm:px-3 sm:py-3">
      <div className="mx-auto max-w-[1440px] space-y-2 sm:space-y-3">
        <DashboardHeader onAddTransaction={() => setShowTxDialog(true)} />

        <div className="grid gap-3 sm:gap-4 px-2 sm:px-0 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-3 sm:space-y-4 min-w-0 overflow-hidden">
            <TaskSection onAddTransaction={() => setShowTxDialog(true)} />
            <PaymentWidgets />
            <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <AnnualProfits />
              <TransactionHistory />
            </div>
          </div>

          <RightSideWidgets onAddGoal={() => setShowGoalDialog(true)} />
        </div>
      </div>

      <AddTransactionDialog open={showTxDialog} onClose={() => setShowTxDialog(false)} />
      <AddSavingsGoalDialog open={showGoalDialog} onClose={() => setShowGoalDialog(false)} />
    </div>
  );
};

export default Index;
