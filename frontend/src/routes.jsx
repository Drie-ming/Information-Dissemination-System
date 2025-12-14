import { createBrowserRouter } from "react-router";

//Login page
import LoginPage from "./layout/LoginPage";

//ResidentPage    
import ResidentPage from "./layout/ResidentPage";
import NotFoundPage from "./components/NotFoundPage";
import ResHomePage from "./components/ResHomePage";


//Barangay officer page
import BarOffiPage from "./layout/BarOffiPage";
import AdminPage from "./layout/AdminPage";
import BarOffHomePage from "./components/BarOffHomePage";

export const router =createBrowserRouter([
    {
        path: '/',
        element: <ResidentPage />,
        children:[
            {
                index: true,  element: <ResHomePage />, outlet:"ResOutlet"
            }
        ]
    },

    {
        path:'/staff_user',
        element: <BarOffiPage />,
        children:[
            {
                index: true, element:<BarOffHomePage/>, outlet: "BarOffOutlet"
            }
        ]
    },

    {
        path:'/admin_user',
        element: <AdminPage />
    },

    {
      path: '/login',
      element: <LoginPage />
    },

    {
        path: '*',
        element: <NotFoundPage />
    }

])