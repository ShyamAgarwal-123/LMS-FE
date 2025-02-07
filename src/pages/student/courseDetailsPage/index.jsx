import React from "react";
import { useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const { courseId } = useParams();
  return <div>{courseId} Hi</div>;
}

export default StudentViewCourseDetailsPage;
