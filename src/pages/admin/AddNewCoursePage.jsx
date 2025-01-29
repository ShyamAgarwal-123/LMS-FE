import ConfigurableGridBackground from "@/components/custom-bg";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/CourseLandingPage";
import CourseSetting from "@/components/instructor-view/courses/add-new-course/CourseSetting";
import LockComponent from "@/components/lock";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentCourse } from "@/customhook/admin-hook";
import { togglePublishService } from "@/service";
import {
  ArrowLeft,
  GraduationCap,
  PanelsRightBottomIcon,
  Settings,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function AddNewCoursePage() {
  const [activeTab, setActiveTab] = useState("course landing page");
  const { courseId } = useParams();
  const { currentCourseData, setCurrentCourseData, loading } =
    useCurrentCourse(courseId);

  async function handlePublishState() {
    const data = await togglePublishService(
      courseId,
      !currentCourseData.isPublished
    );
    if (data.success) {
      setCurrentCourseData({
        ...currentCourseData,
        isPublished: !currentCourseData.isPublished,
      });
    } else {
      console.log(data);
    }
  }

  if (courseId && loading) {
    return <div>Loading.....</div>;
  }
  return (
    <div>
      <ConfigurableGridBackground className="border-2">
        <div className="flex flex-col gap-3 mx-16 pt-6 px-6 pb-2">
          <div className="flex justify-between mt-2 w-full">
            <div className="flex gap-2 items-center justify-center">
              <ArrowLeft />
              <h1 className="text-2xl font-bold ">
                {courseId ? "Update Course" : "Create Course"}
              </h1>
              <span className="bg-white border-2 rounded-2xl px-2 text-xs">
                {currentCourseData.isPublished ? "Publish" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              {/* <Button className="bg-white text-black hover:bg-black hover:text-white">
                Save Update
              </Button> */}
              <Button
                onClick={handlePublishState}
                disabled={currentCourseData.progress() !== 100}
                className="bg-blue-600 text-white transition-all"
              >
                {currentCourseData.isPublished
                  ? "UnPublish Course"
                  : "Publish Course"}
              </Button>
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <div>
              <Tabs
                defaultValue="course landing page"
                value={activeTab}
                className=""
                onValueChange={(e) => setActiveTab(e)}
              >
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="course landing page"
                    className="
               flex gap-1 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                  >
                    <PanelsRightBottomIcon className="h-5" />
                    <span
                      className={`${
                        activeTab === "course landing page" && "font-medium"
                      }`}
                    >
                      Course Landing Page
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cirriculum"
                    className="
               flex gap-1 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                  >
                    <GraduationCap />
                    <span
                      className={`${
                        activeTab === "cirriculum" && "font-medium"
                      }`}
                    >
                      Cirriculum
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="settings"
                    className="flex gap-1 px-2 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                  >
                    <Settings className="h-4" />
                    <span
                      className={`${activeTab === "settings" && "font-medium"}`}
                    >
                      Settings
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>{`${currentCourseData.progress()}/100`}</div>
          </div>
        </div>
      </ConfigurableGridBackground>
      <div className="mx-16 p-6 pt-10 min-h-screen">
        <Tabs value={activeTab}>
          <TabsContent value="course landing page">
            <CourseLandingPage
              currentCourseData={currentCourseData}
              courseId={courseId}
            />
          </TabsContent>
          <TabsContent value="cirriculum">
            <LockComponent isLock={!courseId}>
              <CourseCurriculum courseId={courseId} />
            </LockComponent>
          </TabsContent>
          <TabsContent value="settings">
            <LockComponent isLock={!courseId}>
              <CourseSetting courseId={courseId} />
            </LockComponent>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AddNewCoursePage;
