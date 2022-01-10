import React, { useContext } from "react";
import "cirrus-ui";
import General from "./Layout/General";
import { useRoutes } from "react-router-dom";
import routes from "./Routing/routes";
import RealmContext from "./__helpers__/realmContext";

function App() {
    return <AppInner />;
}

const AppInner = () => {
    const realmApp = useContext(RealmContext);
    const routing = useRoutes(routes(realmApp.currentUser ? true : false));

    return routing;
};

export default App;
