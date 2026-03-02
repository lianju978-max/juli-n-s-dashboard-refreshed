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
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <DashboardHeader onAddTransaction={() => setShowTxDialog(true)} />
      
      <div className="flex flex-col lg:flex-row gap-4 px-2 sm:px-4 lg:px-6 mt-4">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <TaskSection onAddTransaction={() => setShowTxDialog(true)} />
          <PaymentWidgets />
          <div className="flex flex-col md:flex-row gap-4">
            <AnnualProfits />
            <TransactionHistory />
          </div>
        </div>

        {/* Right sidebar */}
        <RightSideWidgets onAddGoal={() => setShowGoalDialog(true)} />
      </div>

      <AddTransactionDialog open={showTxDialog} onClose={() => setShowTxDialog(false)} />
      <AddSavingsGoalDialog open={showGoalDialog} onClose={() => setShowGoalDialog(false)} />
    </div>
  );
};

export default Index;
