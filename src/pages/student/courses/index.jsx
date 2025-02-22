import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useAllStudentViewCourses } from "@/customhook/user-hook";
import { filterOptions, sortOptions } from "@/store/user/studentViewCoursePage";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const { allStudentViewCoursesState, setAllStudentViewCoursesState, loading } =
    useAllStudentViewCourses(filters, sort);
  console.log(filters);

  const handleFilterOnChange = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption.id);
      } else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
  };
  const createSearchParamsHelper = (filtersParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filtersParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  };
  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="p-4 space-y-4">
                <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-3"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) !== -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {allStudentViewCoursesState && allStudentViewCoursesState.length}
            </span>
          </div>
          <div className="space-y-4">
            {allStudentViewCoursesState &&
            allStudentViewCoursesState.length > 0 ? (
              allStudentViewCoursesState.map((courseItem) => (
                <Card
                  onClick={() => navigate(`/course/details/${courseItem._id}`)}
                  className="cursor-pointer"
                  key={courseItem?._id}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.thumbnail}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      {/* instructor name will come */}
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem?.videos_id?.length} ${
                          courseItem?.videos_id.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseItem?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h2>No Courses</h2>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
