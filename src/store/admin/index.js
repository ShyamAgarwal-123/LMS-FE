import { atom, selector, useRecoilState } from "recoil";
import _ from "lodash";

import {
  courseLandingPageDefault,
  languageOptions,
  courseLevelOptions,
  courseLandingPageFormFields,
  courseCategories,
} from "./courseLandingingPage";

import { courseCirriculumDefault } from "./courseCirriculum";
import {
  createCourseLandingPageService,
  updateCourseLandingPageService,
} from "@/service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const courseLandingPageAtom = atom({
  key: "courseLandingPageAtom",
  default: courseLandingPageDefault,
});

export const useCourseLandingPageState = () =>
  useRecoilState(courseLandingPageAtom);

export const useCourseLandingPage = () => {
  const [courseLandingPageState, setCourseLandingPageState] =
    useCourseLandingPageState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await createCourseLandingPageService(courseLandingPageState);
    if (data.success) {
      navigate(`/admin`);
      setCourseLandingPageState(courseCirriculumDefault);
    } else {
      console.log(data);
    }
    setLoading(false);
  };

  return {
    courseLandingPageState,
    setCourseLandingPageState,
    handleSubmit,
    loading,
  };
};

export {
  courseLandingPageDefault,
  languageOptions,
  courseLevelOptions,
  courseLandingPageFormFields,
  courseCategories,
  courseCirriculumDefault,
};

// course Cirriculum store
export const courseCirriculumAtom = atom({
  key: "courseCirriculumAtom",
  default: courseCirriculumDefault,
});

export const useCourseCirriculumState = () =>
  useRecoilState(courseCirriculumAtom);

export const useCourseCirriculum = () => {
  const [courseCirriculumState, setCourseCirriculumState] =
    useCourseCirriculumState();
  return {
    courseCirriculumState,
    setCourseCirriculumState,
  };
};

// Current Course Store
export const currentCourseDefault = {
  courseId: "",
  courseLandingPageData: courseLandingPageDefault,
  courseCirriculumData: courseCirriculumDefault,
  isPublished: false,
  progress() {
    let progress = 0;
    if (
      this.courseId &&
      _.isEqual(this.courseCirriculumData[0], courseCirriculumDefault[0])
    ) {
      progress = 50;
    } else if (
      this.courseId &&
      !_.isEqual(this.courseCirriculumData[0], courseCirriculumDefault[0])
    ) {
      progress = 100;
    }
    return progress;
  },
};

export const currentCourseAtom = atom({
  key: "currentCourseAtom",
  default: currentCourseDefault,
});
export const useCurrentCourseState = () => useRecoilState(currentCourseAtom);

// Current Course Landing Page store
export const currentCourseLandingPageAtom = atom({
  key: "currentCourseLandingPageAtom",
  default: selector({
    key: "currentCourseCirriculumAtom/Defalut",
    get: ({ get }) => {
      const courseData = get(currentCourseAtom);
      return courseData.courseLandingPageData;
    },
  }),
});
export const useCurrentCourseLandingPageState = () =>
  useRecoilState(currentCourseLandingPageAtom);

export const useCurrentCourseLandingPage = () => {
  const [currentCourseLandingPageState, setCurrrentCourseLandingPageState] =
    useCurrentCourseLandingPageState();
  const [currentCourseState, setCurrentCourseState] = useCurrentCourseState();
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    const currentCourseLandingPageData = {
      ...currentCourseLandingPageState,
      isPublished: currentCourseState.isPublished,
    };
    const data = await updateCourseLandingPageService(
      id,
      currentCourseLandingPageData
    );
    if (data.success) {
      console.log(data);
      setCurrentCourseState({
        ...currentCourseState,
        courseLandingPageData: { ...data.data },
      });
    } else {
      console.log(data);
    }
    setLoading(false);
  };
  return {
    currentCourseLandingPageState,
    setCurrrentCourseLandingPageState,
    handleUpdate,
    loading,
  };
};

//current  course Cirriculum store
export const currentCourseCirriculumAtom = atom({
  key: "currentCourseCirriculumAtom",
  default: selector({
    key: "currentCourseAtom/Defalut",
    get: ({ get }) => {
      const courseData = get(currentCourseAtom);
      return courseData.courseCirriculumData;
    },
  }),
});

export const useCurrentCourseCirriculumState = () =>
  useRecoilState(currentCourseCirriculumAtom);

export const useCurrentCourseCirriculum = () => {
  const [currentCourseCirriculumState, setCurrentCourseCirriculumState] =
    useCurrentCourseCirriculumState();
  return {
    currentCourseCirriculumState,
    setCurrentCourseCirriculumState,
  };
};

// All Admin Courses Store
export const allAdminCoursesDefault = [
  {
    _id: null,
    title: "",
    pricing: null,
    students: null,
    revenue: null,
  },
];

export const allAdminCoursesAtom = atom({
  key: "allAdminCoursesAtom",
  default: allAdminCoursesDefault,
});
export const useAllAdminCoursesState = () =>
  useRecoilState(allAdminCoursesAtom);
