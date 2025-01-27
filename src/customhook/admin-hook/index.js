import { getAdminCoursesService, getCourseService } from "@/service";
import {
  useAllAdminCoursesState,
  useCurrentCourseLandingPageState,
  useCurrentCourseState,
} from "@/store/admin";
import { useEffect, useState } from "react";

export const useAllAdminCourses = () => {
  const [allAdminCoursesState, setAllAdminCoursesState] =
    useAllAdminCoursesState();
  const [loading, setLoading] = useState(false);

  const getAdminCourses = async () => {
    setLoading(true);
    const data = await getAdminCoursesService();
    if (data.success) {
      setAllAdminCoursesState(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAdminCourses();
  }, []);

  return { allAdminCoursesState, setAllAdminCoursesState, loading };
};

export const useCurrentCourse = (id) => {
  const [currentCourseData, setCurrrentCourseData] = useCurrentCourseState();
  const [loading, setLoading] = useState(true);

  const getCourse = async (courseId) => {
    setLoading(true);
    const response = await getCourseService(courseId);

    if (response.success) {
      const data = response.data;
      setCurrrentCourseData({
        ...currentCourseData,
        courseId: data._id,
        courseLandingPageData: {
          title: data.title,
          category: data.category,
          description: data.description,
          level: data.level,
          pricing: data.pricing,
          objectives: data.objectives,
          primaryLanguage: data.primaryLanguage,
          subtitle: data.subtitle,
          welcomeMessage: data.welcomeMessage,
        },
        isPublished: data.isPublished,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, []);

  return { currentCourseData, setCurrrentCourseData, loading };
};

export const useUpdateCurrentCourse = (id) => {
  const [lanPageData, setLanPageData] = useCurrentCourseLandingPageState();
};
