import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "../ui/button";
import { useSideBarActivateTabState } from "@/store/admin";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses" },
  // { icon: Users, label: "Students" },
  // { icon: FileText, label: "Assignments" },
  // { icon: MessageSquare, label: "Messages" },
  // { icon: Calendar, label: "Schedule" },
  // { icon: BarChart3, label: "Analytics" },
  // { icon: Settings, label: "Settings" },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useSideBarActivateTabState();
  return (
    <div className="p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Main Menu
        </h2>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                onClick={() => setActiveTab(item.label)}
                key={item.label}
                variant={activeTab == item.label ? "default" : "ghost"}
                className={`
                  w-full justify-start gap-3 h-10 font-medium
                  ${
                    activeTab == item.label
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-foreground"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border pt-4">
        <div className="bg-gradient-card p-4 rounded-lg">
          <h3 className="font-heading font-semibold text-sm mb-2">
            Quick Stats
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Students</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending Reviews</span>
              <span className="font-medium text-dashboard-warning">23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
