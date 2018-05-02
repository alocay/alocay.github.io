import React, { Component} from "react";
import "../../css/App.css";

class Art extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Title</li>
				</ul>
			</div>
			<div className="content">
				Art content goes here.
			</div>
		</div>
    );
  }
}

export default Art;
