import "./App.scss";
import Login from "./pages/login/Login";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Regsiter from "./pages/register/register";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/left-bar/LeftBar";
import RightBar from "./components/right-bar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

let currentUser = true;

const ProtectedRoute = ({ children }: { children: any }) => {
  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    { path: "/login", element: <Login /> },

    { path: "/register", element: <Regsiter /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};