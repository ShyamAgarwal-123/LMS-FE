import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import SideBar from "@/components/sidebar/index2";
import {
  useAllAdminCoursesState,
  useSideBarActivateTabState,
} from "@/store/admin";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AdminCourseComponent from "../../components/instructor-view/courses";
import AdminDashboardComponent from "@/components/instructor-view/dashboard";
import { useUserState } from "@/store/user";
import UserProfile from "@/components/user-profile";
function AdminPage({ children }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [activeTab, setActiveTab] = useSideBarActivateTabState();
  const [user] = useUserState();
  const [courses] = useAllAdminCoursesState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-background font-primary">
      {isProfileOpen && <UserProfile setState={setIsProfileOpen} />}
      {/* NavBar */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-card">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSideBarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-heading text-sm">
                L
              </span>
            </div>
            <h1 className="text-xl font-heading font-semibold">Laksay</h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 max-w-md flex-1 mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 bg-muted border-0"
              placeholder="Search courses, students.."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-foreground">3</span>
            </span>
          </Button>

          <Button
            className="gap-2"
            variant="ghost"
            size="sm"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              {user.user.username}
            </span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* sideBar */}
        <div
          className={`fixed lg:static insert-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 border-b border-border "></div>
          <SideBar />
        </div>

        {/* overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSideBarOpen(false)}
          />
        )}

        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-6">
          {/* <h1 className="text-3xl font-bold mt-1 pl-1 text-blue-400">
            {activeTab === "ashboard" ? "Dashboard" : "My Courses"}
          </h1> */}
          <Tabs value={activeTab} className="mt-4">
            <TabsContent value="Dashboard">
              <AdminDashboardComponent />
            </TabsContent>
            <TabsContent value="Courses">
              <AdminCourseComponent />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
