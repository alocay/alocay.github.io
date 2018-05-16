import React, { Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from "./App.js";
import About from "./About.js";
import Exp from "./Exp.js";
import Art from "./Art.js";
import Contact from "./Contact.js";

class Root extends Component{
  render(){
    return(
		<Router>
			<App>
				<Route exact path="/" component={About} />
				<Route path="/exp" component={Exp} />
				<Route path="/art" component={Art} />
				<Route path="/contact" component={Contact} />
			</App>
		</Router>
    );
  }
}

export default Root;
