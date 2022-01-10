import { Navigate, Outlet, RouteObject } from "react-router-dom";
import App from "../App";
import General from "../Layout/General";
import GeneralNoFooter from "../Layout/GeneralNoFooter";
import Activities from "../Pages/Activities/Activities";
import AddEditActivity from "../Pages/Activities/AddEditActivity";
import ActivityCosts from "../Pages/ActivityCosts/ActivityCosts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";

const routes = (isLoggedIn: boolean): Array<RouteObject> => [
    {
        path: "/",
        element: <GeneralNoFooter />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: "activiteiten",
        element: isLoggedIn ? <General /> : <Navigate to="/login" />,
        children: [
            {
                index: true,
                element: <Activities />,
            },
            {
                path: "toevoegen",
                element: <AddEditActivity />,
            },
            {
                path: "bewerken/:activityId",
                element: <AddEditActivity />,
            },
            {
                path: "kosten/:activityId",
                element: <ActivityCosts />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "registreren",
        element: <Registration />,
    },
];

export default routes;
