import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage/components/StartPage";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <StartPage/>
            },
            {
                path: "/auth",
                element: <h1>Авторизация</h1>
            }
        ]
    },
])

export default router;