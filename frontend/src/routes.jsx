import { createBrowserRouter } from "react-router";

//ResidentPage    
import ResidentPage from "./layout/ResidentPage";
import NotFoundPage from "./components/NotFoundPage";
import ResHomePage from "./components/ResHomePage";


export const router =createBrowserRouter([
    {
        path: '/',
        element: <ResidentPage />,
        children:[
            {
                path: '/',
                element: <ResHomePage />
            }
        ]
    },

    {
        path: '*',
        element: <NotFoundPage />
    }

])