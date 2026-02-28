import { Menu, Search, Mic, Plus, HelpCircle } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button className="neo-card-sm p-2.5 hover:opacity-80 transition-opacity">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="gradient-blue w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Nº</span>
          </div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">Julián dashboard</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Help box */}
        <div className="neo-card-sm px-4 py-2.5 flex items-center gap-2 max-w-xs">
          <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">Hey, Need help? Just ask me anything!</span>
        </div>

        {/* Search */}
        <div className="neo-card-sm flex items-center gap-2 px-3 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground"
          />
        </div>

        {/* Mic */}
        <button className="neo-card-sm p-2.5 hover:opacity-80 transition-opacity">
          <Mic className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Plus */}
        <button className="gradient-blue p-2.5 rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 text-primary-foreground" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Dwayne Tatum</p>
            <p className="text-xs text-muted-foreground">CEO Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden neo-card-sm">
            <div className="w-full h-full gradient-blue flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DT</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
