import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const TaskSection = () => {
  const days = [
    { day: "Mon", num: 18, active: false },
    { day: "Tue", num: 19, active: true },
    { day: "Wed", num: 20, active: false },
    { day: "Thu", num: 21, active: false },
    { day: "Fri", num: 22, active: false },
    { day: "Sat", num: 23, active: false },
  ];

  return (
    <div className="flex items-stretch gap-4">
      {/* Calendar widget */}
      <div className="neo-card p-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:opacity-70"><ChevronLeft className="w-4 h-4 text-muted-foreground" /></button>
          <span className="text-sm font-semibold text-foreground">Tue, December 19</span>
          <button className="p-1 hover:opacity-70"><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <div className="flex gap-2">
          {days.map((d) => (
            <div
              key={d.day}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                d.active
                  ? "gradient-blue text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <span className={`text-xs font-medium ${d.active ? "text-primary-foreground" : "text-muted-foreground"}`}>{d.day}</span>
              <span className={`text-sm font-bold ${d.active ? "text-primary-foreground" : "text-foreground"}`}>{d.num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Show my tasks button */}
      <button className="neo-card flex-1 gradient-blue flex items-center justify-center gap-3 hover:opacity-90 transition-opacity group">
        <span className="text-primary-foreground font-semibold text-lg">Show my Tasks</span>
        <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/30 transition-colors">
          <ChevronRight className="w-5 h-5 text-primary-foreground" />
        </div>
      </button>

      {/* Calendar icon button */}
      <button className="neo-card p-5 flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
        <Calendar className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
};

export default TaskSection;
