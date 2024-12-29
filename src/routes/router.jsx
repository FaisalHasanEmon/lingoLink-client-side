import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import RootLayout from "../layouts/RootLayout";
import FindTutors from "../pages/tutors/FindTutors";
import AddTutorials from "../pages/tutorials/AddTutorials";
import MyBookedTutors from "../pages/bookings/MyBookedTutors";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";

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
        path: "/find-tutors",
        element: <FindTutors></FindTutors>,
      },
      {
        path: "/add-tutorials",
        element: <AddTutorials>s</AddTutorials>,
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
