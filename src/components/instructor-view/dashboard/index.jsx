import ChartsSection from "@/components/charts-section";
import CourseSearch from "@/components/course-search";
import StatsCard from "@/components/stats-card";
import { useAllAdminCourses } from "@/customhook/admin-hook";
import { useAllAdminCoursesState } from "@/store/admin";
import { useUserState } from "@/store/user";
import { BookOpen, DollarSign, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

function AdminDashboardComponent() {
  const [date, setDate] = useState(Date.now());
  const [user] = useUserState();
  const { allAdminCoursesState, setAllAdminCoursesState, loading } =
    useAllAdminCourses();
  // const [course] = useAllAdminCoursesState();
  // console.log(course);

  const hr = new Date(date).getHours();
  console.log(hr);
  let greetings;
  if (hr > 4 && hr < 12) {
    greetings = "Good morning";
  } else if (hr >= 12 && hr < 16) {
    greetings = "Good afternoon";
  } else if (hr >= 16 && hr < 24) {
    greetings = "Good evening";
  } else {
    greetings = "Hey";
  }

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold">
          {greetings}, {user.user.username} 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happeing with your courses today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="1,247"
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
          gradient
        />
        <StatsCard
          title="Monthly Revenue"
          value="$24,680"
          change="+8.2% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Active Courses"
          value="8"
          change="2 new this month"
          changeType="neutral"
          icon={BookOpen}
        />
        <StatsCard
          title="Completion Rate"
          value="87.3%"
          change="+5.1% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cold-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <ChartsSection />
        </div>
        <div className="lg:col-span-3">
          <CourseSearch />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardComponent;
