import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminCourseComponent() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="sm:text-3xl text-2xl font-extrabold">
          All Couses
        </CardTitle>
        <Button
          onClick={() => {
            navigate("/admin/create-new-course");
          }}
          className="sm:p-6 p-3"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right sm:pr-9">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                React JS Full Course 2025
              </TableCell>
              <TableCell>100</TableCell>
              <TableCell>$5000</TableCell>
              <TableCell className="text-right sm:flex-row flex-col flex sm:justify-end items-end">
                <Button variant="ghost">
                  <Edit className="h-6 w-6" />
                </Button>
                <Button variant="ghost">
                  <Delete className="h-6 w-6" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminCourseComponent;
