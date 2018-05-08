import React, { Component} from "react";
import FlipLabel from './FlipLabel.js';

class About extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Armando Locay. </li>
					<li><FlipLabel label={"Developer."} /></li>
					<li>Artist. </li>
					<li>Gamer. </li>
					<li>Outdoor Enthusiast. </li>
					<li>Traveler.</li>
				</ul>
			</div>
			<div className="content">
				About content goes here.
			</div>
		</div>
    );
  }
}

export default About;
