import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/home.css';

const NAV_ITEMS = [
    { number: '01', label: 'About', to: '/about' },
    { number: '02', label: 'Experience', to: '/exp' },
    { number: '03', label: 'Art', to: '/art' },
    { number: '04', label: 'Contact', to: '/contact' },
];

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="home__top-strip">
                <span className="home__site-handle">alocay.github.io</span>
                <span className="home__year">2026</span>
            </div>
            <div className="home__hero">
                <div className="home__label">Software Engineer</div>
                <h1 className="home__name">
                    ARMANDO<br />
                    LOCAY<span className="home__period">.</span>
                </h1>
                <div className="home__tagline-row">
                    <div className="home__dash" />
                    <span className="home__tagline">Builder · Maker · Artist</span>
                </div>
            </div>
            <nav className="home__nav">
                <div className="home__nav-items">
                    {NAV_ITEMS.map(({ number, label, to }) => (
                        <button
                            key={to}
                            className="home__nav-item"
                            onClick={() => navigate(to)}
                        >
                            <span className="home__nav-number">{number}</span>
                            <span className="home__nav-label">{label}</span>
                        </button>
                    ))}
                </div>
                <span className="home__nav-arrow">↗</span>
            </nav>
        </div>
    );
}

export default Home;
