import React from "react";
import { HashRouter as Router } from 'react-router-dom';
import App from "./App.js";

function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;
