import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TaskSection from "@/components/dashboard/TaskSection";
import PaymentWidgets from "@/components/dashboard/PaymentWidgets";
import AnnualProfits from "@/components/dashboard/AnnualProfits";
import ActivityManager from "@/components/dashboard/ActivityManager";
import RightSideWidgets from "@/components/dashboard/RightSideWidgets";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <DashboardHeader />
      
      <div className="flex gap-4 px-6 mt-4">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <TaskSection />
          <PaymentWidgets />
          <div className="flex gap-4">
            <AnnualProfits />
            <ActivityManager />
          </div>
        </div>

        {/* Right sidebar */}
        <RightSideWidgets />
      </div>
    </div>
  );
};

export default Index;
