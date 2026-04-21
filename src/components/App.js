import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './TopNav.js';
import Home from './Home.js';
import About from './About.js';
import Exp from './Exp.js';
import Art from './Art.js';
import Contact from './Contact.js';
import '../../css/App.css';
import '../../css/transitions.css';

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="root-container">
            {!isHome && <TopNav />}
            <div key={location.pathname} className="page-enter">
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/exp" element={<Exp />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
