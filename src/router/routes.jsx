import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllModels from "../Pages/AllModels/AllModels";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AddModel from "../Pages/AddModel/AddModel";
import ModelDetails from "../Pages/ModelDetails/ModelDetails";
import UpdateModel from "../Pages/UpdateModel/UpdateModel";
import MyModels from "../Pages/MyModels/MyModels";
import MyPurchases from "../Pages/MyPurchases/MyPurchases";


const ErrorPage = ({ error }) => {
  console.error('Route Error:', error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-error">404</h1>
        <p className="text-xl mb-6">Oops! This AI model doesn’t exist.</p>
        <Link
          to="/"
          className="btn btn-primary rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const res = await fetch("https://ai-model-server.vercel.app/latest-models");
          if (!res.ok) throw new Error("Failed to load latest models");
          return res.json();
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "/models",
        element: <AllModels />,
        loader: async () => {
          const res = await fetch("https://ai-model-server.vercel.app/models");
          if (!res.ok) throw new Error("Failed to load models");
          return res.json();
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-model",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "/model-details/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const token = localStorage.getItem('token') || '';
          const res = await fetch(`https://ai-model-server.vercel.app/models/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            console.warn(`Model ID ${params.id} not found (404)`); 
            return { success: false, message: 'Model not found' }; 
          }
          return res.json();
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-purchases",
        element: (
          <PrivateRoute>
            <MyPurchases />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`https://ai-model-server.vercel.app/models/${params.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
          });
          if (!res.ok) {
            console.warn(`Update loader: Model ID ${params.id} not found`);
            return { success: false, message: 'Model not found' }; 
          }
          return res.json();
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);