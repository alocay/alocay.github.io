import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/topnav.css';

const NAV_LINKS = [
    { to: '/exp', label: 'Experience', number: '01' },
    { to: '/art', label: 'Maker', number: '02' },
    { to: '/contact', label: 'Contact', number: '03' },
];

function TopNav() {
    const { pathname } = useLocation();
    return (
        <nav className="topnav">
            <Link to="/" className="topnav__home">AL</Link>
            <div className="topnav__divider" />
            <div className="topnav__links">
                {NAV_LINKS.map(({ to, label, number }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`topnav__link${pathname === to ? ' topnav__link--active' : ''}`}
                    >
                        <span className="topnav__link-number">{number}</span>
                        <span className="topnav__link-label">{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default TopNav;
