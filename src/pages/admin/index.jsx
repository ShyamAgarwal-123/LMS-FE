import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { logoutService } from "@/service";
import { useUserState, userDefault } from "@/store/user";
import { TabsContent } from "@radix-ui/react-tabs";
import { BarChart, BookCheckIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCourseComponent from "./courses";
function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userState, setUserState] = useUserState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await logoutService();
    if (data.success) {
      setUserState(userDefault);
      navigate("/auth");
    }
  };

  return (
    <div className="flex sm:flex-row relative">
      <aside className="sm:min-h-screen sm:h-full md:w-40 bg-white text-black transition-all duration-300 sm:w-12 flex p-2 sm:flex-col justify-between items-center sm:relative fixed left-0 right-0 flex-row">
        <nav className="flex sm:flex-col flex-row gap-4 mt-1">
          <button
            className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
              activeTab === "dashboard" && "bg-slate-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart />
            <span className="md:block hidden font-bold">Dashboard</span>
          </button>
          <button
            className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
              activeTab === "courses" && "bg-slate-200"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            <BookCheckIcon className="" />
            <span className="hidden md:block font-bold">Courses</span>
          </button>
        </nav>
        <div className="mb-1">
          <button
            className="flex gap-2 cursor-pointer w-full"
            onClick={handleLogout}
          >
            <LogOut />
            <span className="hidden md:block font-bold">Logout</span>
          </button>
        </div>
      </aside>
      <main className="bg-slate-200 w-full min-h-screen h-full sm:pt-3 pt-20 px-4">
        <h1 className="text-4xl font-bold mt-1">Admin Pannel</h1>
        <Tabs value={activeTab} className="mt-4">
          <TabsContent value="dashboard">Dashboard</TabsContent>
          <TabsContent value="courses">
            <AdminCourseComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default AdminPage;
