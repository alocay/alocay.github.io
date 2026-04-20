import React from "react";
import { NavLink } from 'react-router-dom';

const routes = [
    { path: '/', name: 'About' },
    { path: '/exp', name: 'Experience' },
    { path: '/art', name: 'Art/Photography' },
    { path: '/contact', name: 'Contact' },
];

function Navbar() {
    return (
        <nav>
            <ul>
                {routes.map(r => (
                    <li key={r.path}>
                        <NavLink
                            to={r.path}
                            end={r.path === '/'}
                            className={({ isActive }) => isActive ? 'active' : undefined}
                        >
                            {r.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
