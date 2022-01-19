import { Link, Outlet, useLocation } from "react-router-dom";
import GeneralActivities from "./GeneralActivities";

const Activities = () => {
    const { pathname } = useLocation();

    const isSelected = (url: string): boolean => {
        const splittedPath = pathname.split('/');
        const included = splittedPath.includes(url.toLowerCase());

        return included;
    }

    return (
        <GeneralActivities>
            <div className="tab-container tabs-center tabs-medium">
                <ul>
                    <li className={isSelected('gepland') ? "selected" : ""}><Link to="gepland" className="uppercase font-bold">Gepland</Link></li>
                    <li className={isSelected('niet-gepland') ? "selected" : ""}><Link to="niet-gepland" className="uppercase font-bold">Niet Gepland</Link></li>
                </ul>
            </div>
            <Outlet />
        </GeneralActivities>
    );
};

export default Activities;
