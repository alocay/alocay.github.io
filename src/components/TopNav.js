import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/topnav.css';

const NAV_LINKS = [
    { to: '/about', label: 'About' },
    { to: '/exp', label: 'Experience' },
    { to: '/art', label: 'Art' },
    { to: '/contact', label: 'Contact' },
];

function TopNav() {
    const { pathname } = useLocation();
    return (
        <nav className="topnav">
            <Link to="/" className="topnav__monogram">AL</Link>
            <div className="topnav__divider" />
            <div className="topnav__links">
                {NAV_LINKS.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`topnav__link${pathname === to ? ' topnav__link--active' : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default TopNav;
