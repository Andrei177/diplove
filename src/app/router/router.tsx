import { createBrowserRouter } from "react-router-dom";
import { StartPage } from "../../pages/StartPage/";
import App from "../../App";
import { Auth } from "../../pages/Auth";
import { Login } from "../../pages/Login";
import { Routes } from "./router.config";
import { Name } from "../../pages/Name";
import { Birthday } from "../../pages/Birthday";
import { Interes } from "../../pages/Interes";
import { PrivateRoute } from "../../pages/PrivateRoute";
import { SearchGender } from "../../pages/SearchGender";
import { lazy } from "react";
import { Forms } from "../../pages/Forms";

const Profile = lazy(() => import('../../pages/Profile/ui/Profile'))
const Chats = lazy(() => import('../../pages/Chats/ui/Chats'))
// const Forms = lazy(() => import('../../pages/Forms/ui/Forms'))
const Likes = lazy(() => import('../../pages/Likes/ui/Likes'))
const Gender = lazy(() => import('../../pages/Gender/ui/Gender'))

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
                path: Routes.FORMS,
                element: <Forms/>
            },
            {
                path: Routes.LIKES,
                element: <Likes/>
            },
            {
                path: Routes.GENDER,
                element: <Gender/>
            },
            {
                path: Routes.SEARCH_GENDER,
                element: <SearchGender/>
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