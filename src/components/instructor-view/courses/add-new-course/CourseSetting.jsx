import MediaProgressBar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadCourseThumbnailService } from "@/service";
import {
  useCurrentCourseLandingPageState,
  useMediaUploadProgressPercentageState,
  useMediaUploadProgressState,
} from "@/store/admin";
import { Upload } from "lucide-react";
import React from "react";

function CourseSetting({ courseId }) {
  const [currentCourseData, setCurrentCourseData] =
    useCurrentCourseLandingPageState();
  const [mediaUploadProgress, setMediaUploadProgress] =
    useMediaUploadProgressState();
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useMediaUploadProgressPercentageState();
  async function handleImageUpload(e) {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);
      setMediaUploadProgress(true);
      const data = await uploadCourseThumbnailService(
        imageFormData,
        courseId,
        setMediaUploadProgressPercentage
      );
      if (data.success) {
        setCurrentCourseData((prev) => ({
          ...prev,
          image: data?.data?.thumbnail || prev.image,
        }));
      } else {
        console.log(data);
      }
      setMediaUploadProgress(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="px-2">
          {mediaUploadProgress && (
            <MediaProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercentage}
            />
          )}
        </div>
        <div className="w-full flex gap-20 justify-between items-center">
          <div className="flex flex-col gap-3 w-full">
            <Label>Upload Course Image</Label>
            <Input
              onChange={handleImageUpload}
              type="file"
              accept="image/*"
              className="file:cursor-pointer file:bg-blue-300 file:rounded-sm file:px-2 file:font-semibold file:text-blue-700 cursor-pointer"
            />
          </div>
          <img src={currentCourseData.image} className="max-h-72" />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSetting;
