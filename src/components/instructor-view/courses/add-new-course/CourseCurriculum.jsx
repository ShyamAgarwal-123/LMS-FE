import { axiosInstanceWithAuth } from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { uploadVideoService } from "@/service";
import {
  currentCourseDefault,
  useCurrentCourseCurriculumState,
} from "@/store/admin";
import { LucideDelete, UploadIcon } from "lucide-react";
import React from "react";

function CourseCurriculum({ courseId }) {
  const [currentCourseCurriculumState, setCurrentCourseCurriculumState] =
    useCurrentCourseCurriculumState();
  console.log(currentCourseCurriculumState);

  function handleNewLecture() {
    setCurrentCourseCurriculumState((prev) => [
      ...prev,
      currentCourseDefault.courseCurriculumData[0],
    ]);
  }
  function handleRemove(e, index) {
    if (index !== 0 && !currentCourseCurriculumState[index].videoUrl) {
      setCurrentCourseCurriculumState((prev) => {
        prev.slice(0, index).concat(prev.slice(index + 1));
      });
    } else alert("One Lecture is Required");
  }

  function handleInput(e, index) {
    const newtitle = e.target.value;
    setCurrentCourseCurriculumState((prev) =>
      prev.map((item, ind) => {
        if (ind === index) {
          const newiteam = { ...item };
          newiteam.title = newtitle;
          return newiteam;
        } else return item;
      })
    );
  }

  function handleSwitch(currentValue, index) {
    const newFreePreview = currentValue;
    setCurrentCourseCurriculumState((prev) =>
      prev.map((item, ind) => {
        if (ind === index) {
          const newiteam = { ...item };
          newiteam.freePreview = newFreePreview;
          return newiteam;
        } else return item;
      })
    );
  }

  async function handleSingleLectureUpload(e, index) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", currentCourseCurriculumState[index].title);
    formData.append(
      "freePreview",
      currentCourseCurriculumState[index].freePreview
    );

    const data = await uploadVideoService(formData, courseId);
    if (data.success) {
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return data.data;
          }
          return item;
        })
      );
    } else {
      console.log(data);
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return currentCourseCurriculumState[0];
          }
          return item;
        })
      );
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Cirriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture} className="bg-blue-600">
          Add Lecture
        </Button>
        <div className="mt-4 space-y-4">
          {currentCourseCurriculumState.map((cirriculumItem, index) => (
            <div className="border p-5 rounded-md relative" key={index + 1}>
              {cirriculumItem.videoUrl ? (
                <Button className="bg-blue-500 absolute top-3 right-28">
                  Update
                </Button>
              ) : (
                <UploadIcon className="absolute top-3 right-20 h-8" />
              )}
              {cirriculumItem.videoUrl ? (
                <Button className="bg-blue-500 absolute top-3 right-5">
                  Delete
                </Button>
              ) : (
                <LucideDelete
                  className="absolute top-3 right-5 h-8"
                  onClick={(e) => handleRemove(e, index)}
                />
              )}

              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-96"
                  value={cirriculumItem.title}
                  onChange={(e) => handleInput(e, index)}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={cirriculumItem.freePreview}
                    id={`freePreview-${index + 1}`}
                    onCheckedChange={(currentValue) =>
                      handleSwitch(currentValue, index)
                    }
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6 relative group">
                <Input
                  type="file"
                  accept="video/*"
                  className="justify-center mb-4 cursor-pointer file:bg-blue-300 file:rounded-sm file:px-2 file:font-semibold file:text-blue-700"
                />
                {!cirriculumItem.title && (
                  <div
                    className={`absolute left-0 top-full mt-2 hidden w-max rounded-lg bg-gray-800 p-2 text-white text-xs shadow-lg group-hover:block hover:file:bg-blue-100`}
                  >
                    Title is Required!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
