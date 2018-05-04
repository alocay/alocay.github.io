import React, { Component} from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from "./Navbar.js";
import About from "./About.js";
import Work from "./Work.js";
import Art from "./Art.js";
import Contact from "./Contact.js";
import "../../css/App.css";

class App extends Component{
  render(){
    return(
		<div className="root-container">
			<Navbar />
			<div className="content-container">
				{this.props.children}
			</div>
		</div>
    );
  }
}

App.propTypes = {
	children: PropTypes.node,
};

export default App;
