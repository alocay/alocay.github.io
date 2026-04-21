import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import Home from './Home';
import About from './About';
import Exp from './Exp';
import Art from './Art';
import Contact from './Contact';
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
                    <Route path="/maker" element={<Art />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
