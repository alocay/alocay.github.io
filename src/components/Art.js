import React, { Component} from "react";

class Art extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Art.</li>
				</ul>
			</div>
			<div className="content">
				<h4 className="text-left">sketches.</h4>
                <hr />
                <h4 className="text-left">photography.</h4>
                <hr />
			</div>
		</div>
    );
  }
}

export default Art;
