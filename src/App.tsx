import React from "react";
import "cirrus-ui";
import General from "./Layout/General";
import Home from "./Pages/Home/Home";
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
    return (
        <General>
            <Outlet />
        </General>
    );
}

export default App;
