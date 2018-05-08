import React, { Component} from "react";
import FlipLabelPool from './FlipLabelPool.js';
import FlipLabel from './FlipLabel.js';

const words = [
    ["Developer.", "Testing.", "Programmer.", "Algorithm.", "Engineer."],
    ["Artist.", "Charcoal.", "Blend.", "Lights.", "Perspective.", "Angle.", "Photography."],
    ["Gamer.", "PC.", "Platformer.", "Dimension.", "Imagination."],
    ["Outdoors.", "Hiking.", "Nature.", "Trek.", "Rock Climber.", "Earth."],
    ["Travel.", "Explorer.", "Sights.", "Beyond.", "Cultures.", "Food."]
];

class About extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li><FlipLabel label={"Armando Locay."} /></li>
                    { words.map((w, i) => <li key={i}><FlipLabelPool labels={w} /></li>) }
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
