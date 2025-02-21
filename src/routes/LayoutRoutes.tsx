import {  lazy } from "react"
import AppLayout from "../views/layouts/AppLayout"
import Loadable from "../components/loader/Loadable";
const HomePage =Loadable(lazy(()=>import('../views/pages/Home/HomePage')))

const LayoutRoutes = {
    path: '/',
    children: [
      {
        path: '/',
        element: (
            <AppLayout />
        ),
        children: [
          {
            path: '/home',
            element: <HomePage />,
          },
       
        ],
      },
    ],
  };
  
  export default LayoutRoutes;