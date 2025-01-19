import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthPage from "./pages/auth";

import { RouterProvider } from "react-router";
import RouteGuard from "./components/route-guard";
import { useUserState } from "./store/user";
import InstructorDashBoardComponent from "./pages/instructor";
import StudentLayout from "./components/student-view/StudentLayout";
import StudentHomePage from "./pages/student/home";

function App() {
  const [userState, setUserState] = useUserState();

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route
              path=""
              element={
                <RouteGuard
                  authenticated={userState?.authenticated}
                  user={userState?.user}
                  element={<StudentLayout />}
                />
              }
            >
              <Route path="" element={<StudentHomePage />} />
              <Route path="home" element={<StudentHomePage />} />
            </Route>
            <Route
              path="auth"
              element={
                <RouteGuard
                  authenticated={userState?.authenticated}
                  user={userState?.user}
                  element={<AuthPage />}
                />
              }
            />
            <Route
              path="instructor"
              element={
                <RouteGuard
                  authenticated={userState?.authenticated}
                  user={userState?.user}
                  element={<InstructorDashBoardComponent />}
                />
              }
            />
          </Route>
        )
      )}
    />
  );
}

export default App;
