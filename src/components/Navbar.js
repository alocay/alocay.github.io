import React, { Component} from "react";
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import "../../css/navbar.css";

const Routes = [
    {
        path: '/',
        name: 'About'
    },
    {
        path: '/work',
        name: 'Work'
    },
    {
        path: '/art',
        name: 'Art/Photography'
    },
    {
        path: '/contact',
        name: 'Contact'
    },
];

class Navbar extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            active: '/'
        };
    }
    
    linkClicked(path) {
        this.setState({ active: path });
    }
    
    render(){
        return(
            <nav>
                <ul>
                    { Routes.map(r => 
                        <li key={r.path} onClick={this.linkClicked.bind(this, r.path)}>
                            <Link to={r.path} className={classnames({'active': r.path === this.state.active})}>{r.name}</Link>
                        </li>) }
                </ul>
            </nav>
        );
    }
}

export default Navbar;
