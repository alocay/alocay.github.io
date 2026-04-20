import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar.js";
import About from "./About.js";
import Exp from "./Exp.js";
import Art from "./Art.js";
import Contact from "./Contact.js";
import "../../css/App.css";

function App() {
    return (
        <div className="root-container">
            <Navbar />
            <div className="content-container">
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/exp" element={<Exp />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
