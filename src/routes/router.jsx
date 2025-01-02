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
import Details from "../pages/detials/Details";
import UpdateTutorials from "../pages/updateMyTutorials/UpdateTutorials";
import PrivateRouter from "./PrivateRouter";
import Error from "../pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    // errorElement: <Error></Error>,
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
        element: (
          <PrivateRouter>
            <AddTutorials></AddTutorials>
          </PrivateRouter>
        ),
      },
      {
        path: "/details/:tutorId",
        element: (
          <PrivateRouter>
            <Details></Details>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${serverDomain}/tutorDetails/${params.tutorId}`),
      },
      {
        path: "/my-tutorials",
        element: (
          <PrivateRouter>
            <MyTutorials></MyTutorials>,
          </PrivateRouter>
        ),
      },
      {
        path: "/my-tutorials/update/:id",
        element: (
          <PrivateRouter>
            <UpdateTutorials></UpdateTutorials>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${serverDomain}/tutorDetails/${params.id}`),
      },
      {
        path: "/booked-tutors",
        element: (
          <PrivateRouter>
            <MyBookedTutors></MyBookedTutors>
          </PrivateRouter>
        ),
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
