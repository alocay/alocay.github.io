import React, { Component} from "react";
import FlipLabelPool from './FlipLabelPool.js';
import FlipLabel from './FlipLabel.js';

const labs = ["Developer.", "Programmer."];

class About extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Armando Locay. </li>
					<li><FlipLabelPool labels={labs} /></li>
					<li><FlipLabel label={"Artist."} /></li>
					<li><FlipLabel label={"Gamer."} /></li>
					<li><FlipLabel label={"Outdoors."} /></li>
					<li><FlipLabel label={"Traveler."} /></li>
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
