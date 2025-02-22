import { lazy } from "react"
import AppLayout from "../views/layouts/AppLayout"
import Loadable from "../components/loader/Loadable";
import { EmployeeProvider } from "../ContextProvider/EmployeeProvider";
import { ThemeProvider } from "../ContextProvider/ThemeContext";
const HomePage = Loadable(lazy(() => import('../views/pages/Home/HomePage')))
const CreateEmployee = Loadable(lazy(() => import('../views/pages/Home/CreateEmployee')))
const EmployeeCard = Loadable(lazy(() => import('../views/pages/EmployeeCard/EmployeeCard')))
const LayoutRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <ThemeProvider>
          <EmployeeProvider>
            <AppLayout />
          </EmployeeProvider>
        </ThemeProvider>


      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/create-empolyee',
          element: <CreateEmployee />,
        },
        {
          path: '/employee-card',
          element: <EmployeeCard />,
        }
      ],
    },
  ],
};

export default LayoutRoutes;