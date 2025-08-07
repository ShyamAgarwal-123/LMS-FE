import { useSideBarActivateTabState } from "@/store/admin";
import { BarChart, BookCheckIcon, LogOut } from "lucide-react";
import LogoComponet from "@/components/logo/WebLogo";
import Profile from "@/components/logo/ProfileLogo";

function SideBar() {
  const [activeTab, setActiveTab] = useSideBarActivateTabState();
  const handleLogout = async () => {
    const data = await logoutService();
    if (data.success) {
      setUserState(userDefault);
      navigate("/auth");
    }
  };
  return (
    <aside className="sm:border-r-2 border-b-2 sm:min-h-screen sm:h-full md:w-44 bg-white text-black transition-all duration-300 sm:w-12 flex p-2 sm:flex-col justify-between items-center sm:relative fixed left-0 right-0 flex-row">
      <nav className="flex sm:flex-col flex-row gap-4 mt-1">
        <button
          className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
            activeTab === "dashboard" && "bg-slate-200"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <BarChart />
          <span
            className={`md:block hidden ${
              activeTab === "dashboard" && "font-bold"
            }`}
          >
            Dashboard
          </span>
        </button>
        <button
          className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
            activeTab === "courses" && "bg-slate-200"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <BookCheckIcon className="" />
          <span
            className={`md:block hidden ${
              activeTab === "courses" && "font-bold"
            }`}
          >
            Courses
          </span>
        </button>
      </nav>
      <div className="mb-1 text-red-500 md:self-start flex sm:flex-col flex-row gap-2 mt-1 font-bold">
        <button className="flex gap-2 p-2 items-center" onClick={handleLogout}>
          <Profile />
          <span className="hidden md:block text-black">Profile</span>
        </button>
        <button className="flex gap-2 p-2 items-center" onClick={handleLogout}>
          <LogOut />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
