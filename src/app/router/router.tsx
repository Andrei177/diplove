import { createBrowserRouter } from "react-router-dom";
import { StartPage } from "../../pages/StartPage/";
import App from "../../App";
import { Auth } from "../../pages/Auth";
import { Login } from "../../pages/Login";
import { Routes } from "./router.config";
import { Gender } from "../../pages/Gender";
import { Name } from "../../pages/Name";
import { Birthday } from "../../pages/Birthday";
import { Interes } from "../../pages/Interes";
import { PrivateRoute } from "../../pages/PrivateRoute";
import { Profile } from "../../pages/Profile";
import { Chats } from "../../pages/Chats";

const router = createBrowserRouter([
    {
        path: Routes.START_PAGE,
        element: <App/>,
        children: [
            {
                path: "",
                element: <StartPage/>
            },
            {
                path: Routes.REGISTRATION,
                element: <Auth/>
            },
            {
                path: Routes.LOGIN,
                element: <Login/>
            },
        ]
    },
    {
        path: Routes.ROOT,
        element: <PrivateRoute/>,
        children: [
            {
                path: Routes.PROFILE,
                element: <Profile/>
            },
            {
                path: Routes.CHATS,
                element: <Chats/>
            },
            {
                path: Routes.GENDER,
                element: <Gender/>
            },
            {
                path: Routes.NAME,
                element: <Name/>
            },
            {
                path: Routes.BIRTHDAY,
                element: <Birthday/>
            },
            {
                path: Routes.INTERES,
                element: <Interes/>
            }
        ]
    }
])

export default router;