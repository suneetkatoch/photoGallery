import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";

import { Home } from "../pages/Home.jsx";
import { Gallery } from "../pages/Gallery.jsx";

import LoginUser from "../pages/LoginUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      
      {
        path: "login",
        element: <LoginUser />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      }
      
      
      
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      //   children: [
      //     {
      //       path: "user-profile",
      //       element: <UserProfile />,
      //     },
      //     {
      //       path: "orders",
      //       element: <Order />,
      //     },
      //     {
      //       path: "category",
      //       element: <CategoryPage />,
      //     },{
      //       path: "sub-category",
      //       element: <SubCategoryPage />,
      //     },{
      //       path: "upload-product",
      //       element: <UploadProduct />,
      //     },
      //     {
      //       path: "products",
      //       element: <ProductsAdmin />,
      //     }
      //   ],
      // },
    ],
  },
]);

export default router;
