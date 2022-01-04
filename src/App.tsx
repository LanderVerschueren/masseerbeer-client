import React from "react";
import "cirrus-ui";
import General from "./Layout/General";
import Home from "./Pages/Home/Home";

function App() {
    return (
        <General>
            <Home />
        </General>
    );
}

export default App;
