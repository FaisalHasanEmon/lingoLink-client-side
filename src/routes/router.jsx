import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import RootLayout from "../layouts/RootLayout";
import FindTutors from "../pages/tutors/FindTutors";
import AddTutorials from "../pages/tutorials/AddTutorials";
import MyBookedTutors from "../pages/bookings/MyBookedTutors";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import Category from "../pages/home/Category";
import serverDomain from "../api/serdomain";
import MyTutorials from "../pages/tutorials/MyTutorials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:category",
        element: <Category></Category>,
        loader: ({ params }) =>
          fetch(`${serverDomain}/category?category=${params.category}`),
      },
      {
        path: "/find-tutors",
        element: <FindTutors></FindTutors>,
      },
      {
        path: "/add-tutorials",
        element: <AddTutorials></AddTutorials>,
      },
      {
        path: "/my-tutorials",
        element: <MyTutorials></MyTutorials>,
      },
      {
        path: "/booked-tutors",
        element: <MyBookedTutors></MyBookedTutors>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
