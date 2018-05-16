import React, { Component} from "react";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ExpList from "./Exp/ExpList.js";
import FuzzyDemo from "./Exp/FuzzyDemo.js";

class Work extends Component{
    render(){
        return(
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}/fuzzy`}
                    render={() => <FuzzyDemo />}
                />
                
                <Route
                    exact
                    path={this.props.match.url}
                    render={() => <ExpList />}
                />
            </div>
        );
    }
}

export default Work;
