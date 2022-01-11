import { Outlet, RouteObject } from "react-router-dom";
import General from "../Layout/General";
import GeneralNoFooter from "../Layout/GeneralNoFooter";
import Activities from "../Pages/Activities/Activities";
import ActivityDetails from "../Pages/Activities/ActivityDetails";
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
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "registreren",
                element: <Registration />,
            },
        ],
    },
    {
        path: "activiteiten",
        element: <General />,
        children: [
            {
                index: true,
                element: <Activities />,
            },
            {
                path: ":activityId",
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <ActivityDetails />,
                    },
                    {
                        path: "bewerken",
                        element: <AddEditActivity />,
                    },
                    {
                        path: "kosten",
                        element: <ActivityCosts />,
                    },
                ],
            },
            {
                path: "toevoegen",
                element: <AddEditActivity />,
            },
        ],
    },
];

export default routes;
