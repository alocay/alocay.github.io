import React, { Component} from "react";
import FlipLabelPool from './FlipLabelPool.js';
import FlipLabel from './FlipLabel.js';

const words = [
    ["Developer.", "Engineer.", "Testing.", "Programmer.", "Algorithm.", ],
    ["Artist.", "Charcoal.", "Blend.", "Lights.", "Perspective.", "Angle.", "Photography."],
    ["Gamer.", "PC.", "Platformer.", "Dimension.", "Imagination."],
    ["Outdoors.", "Hiking.", "Nature.", "Trek.", "Rock Climber.", "Earth."],
    ["Travel.", "Explorer.", "Sights.", "Beyond.", "Cultures.", "Food."]
];

class About extends Component{
  render(){
    return(
		<div>
			<div className="header">
				<ul>
					<li><FlipLabel label={"Armando Locay."} /></li>
                    { words.map((w, i) => <li key={i}><FlipLabelPool labels={w} /></li>) }
				</ul>
			</div>
			<div className="content">
			</div>
		</div>
    );
  }
}

export default About;
