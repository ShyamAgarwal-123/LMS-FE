import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthPage from "./pages/auth";

import { RouterProvider } from "react-router";
import RouteGuard from "./components/route-guard";
import InstructorDashBoardComponent from "./pages/instructor";
import StudentLayout from "./components/student-view/StudentLayout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<RouteGuard element={<StudentLayout />} />}>
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>
      <Route path="auth" element={<RouteGuard element={<AuthPage />} />} />
      <Route
        path="admin"
        element={<RouteGuard element={<InstructorDashBoardComponent />} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
