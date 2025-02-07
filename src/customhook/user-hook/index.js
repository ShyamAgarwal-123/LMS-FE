import { getAllStudentViewCourses } from "@/service";
import { useAllStudentViewCoursesState } from "@/store/user";
import { useEffect, useState } from "react";

export const useAllStudentViewCourses = (filters, sort) => {
  const [allStudentViewCoursesState, setAllStudentViewCoursesState] =
    useAllStudentViewCoursesState();
  const [loading, setLoading] = useState(false);
  async function fetchStudentAllCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    setLoading(true);
    const data = await getAllStudentViewCourses(query);
    if (data.success) {
      setAllStudentViewCoursesState(data?.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (filters || sort) fetchStudentAllCourses(filters, sort);
  }, [filters, sort]);

  return {
    allStudentViewCoursesState,
    setAllStudentViewCoursesState,
    loading,
  };
};
