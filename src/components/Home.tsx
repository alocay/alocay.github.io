import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FlipLabelPool from './FlipLabel/FlipLabelPool';
import '../../css/home.css';

const NAV_ITEMS = [
    { number: '01', label: 'Experience', to: '/exp' },
    { number: '02', label: 'Maker', to: '/maker' },
    { number: '03', label: 'Contact', to: '/contact' },
];

const TAGLINE_WORDS = [
    'Artist',
    'Gamer',
    'Woodworker',
    'Brewer',
    'Hiker',
    'Traveler',
    'Enthusiast',
    'Dog Lover',
    'Reader',
    'Photographer',
    'Pathfinder',
];

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <nav className="home__nav">
                <Link to="/" className="home__nav-monogram">AL</Link>
                <div className="home__nav-divider" />
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
            </nav>
            <div className="home__hero">
                <div className="home__label">Software Engineer</div>
                <h1 className="home__name">
                    ARMANDO<br />
                    LOCAY<span className="home__period">.</span>
                </h1>
                <div className="home__tagline-row">
                    <div className="home__dash" />
                    <div className="home__tagline">
                        <span>Developer · Maker · </span>
                        <FlipLabelPool labels={TAGLINE_WORDS} />
                    </div>
                </div>
                <div className="home__about">
                    <p className="home__about-bio">
                        Software engineer with 10+ years building products across tech,
                        defense, and more. I design and write code by day and make art,
                        woodwork, mead, and tools by night.
                    </p>
                </div>
            </div>
            <div className="home__footer">
                <span className="home__site-handle">alocay.github.io</span>
                <span className="home__year">2026</span>
            </div>
        </div>
    );
}

export default Home;
