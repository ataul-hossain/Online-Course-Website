import "./App.css";
import Header from "./components/Header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import Course from "./pages/Course/Course";

import Checkout from "./pages/Checkout/Checkout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";

import useFetch from "./hooks/useFetch";
import Dashboard from "./pages/Dashboard/Dashboard";
import CheckPhone from "./components/CheckPhone/CheckPhone";
import WatchRecordings from "./pages/Recordings/WatchRecordings";
import axios from "axios";

import YourCourses from "./components/YourCourses/YourCourses";
import Transactions from "./pages/Transactions/Transactions";

import WatchVideos from "./components/WatchVideos/WatchVideos";

import FreeContent from "./components/FreeContent/FreeContent";

function App() {
  const { user } = useContext(AuthContext);
  const [load, setLoad] = useState([]);
  const [url, setUrl] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const gotData = await axios.get(
        `http://localhost:8000/api/user/${user.phone}`
      );
      setLoad(gotData.data);
    };
    fetchData();
  }, [user, url]);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const userData = load;
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/courses"
  );

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Home
              userData={userData}
              user={user}
              data={data}
              loading={loading}
            />
          ),
        },
        {
          path: "/courses",
          element: (
            <Courses
              userData={userData}
              user={user}
              data={data}
              loading={loading}
            />
          ),
        },
        {
          path: "/login",
          element: <CheckPhone />,
        },
        {
          path: "/course/:seo_slug",
          element: (
            <Course
              userData={userData}
              user={user}
              data={data}
              loading={loading}
            />
          ),
        },
        {
          path: "/checkout/:seo_slug",
          element: (
            <Checkout
              userData={userData}
              user={user}
              data={data}
              loading={loading}
              error={error}
            />
          ),
        },
        {
          path: "/dashboard",
          element: (
            <Dashboard
              userData={userData}
              user={user}
              data={data}
              loading={loading}
            />
          ),
        },

        {
          path: "/dashboard/class-recordings/",
          element: (
            <WatchRecordings
              user={user}
              data={data}
              loading={loading}
              error={error}
              userData={userData}
            />
          ),
        },
        {
          path: "/dashboard/courses/",
          element: (
            <YourCourses
              user={user}
              data={data}
              loading={loading}
              error={error}
              userData={userData}
            />
          ),
        },
        {
          path: "/dashboard/payments",
          element: (
            <Transactions
              data={data}
              userData={userData}
              loading={loading}
              error={error}
              user={user}
            />
          ),
        },
        {
          path: "/dashboard/watch-recordings/free/:category/:seo_slug",
          element: (
            <WatchVideos
              user={user}
              userData={userData}
              data={data}
              loading={loading}
              error={error}
            />
          ),
        },
        {
          path: "/dashboard/free-content",
          element: <FreeContent />,
        },
        {
          path: "*",
          element: <h1>NotFound</h1>,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
