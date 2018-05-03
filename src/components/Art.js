import React, { Component} from "react";
import FadeInImage from "./FadeInImage.js";

const src = "../../assets/clothflag.png";
const preloadSrc = "../../assets/clothflag_placeholder.png";

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
                <FadeInImage src={src} preloadSrc={preloadSrc} />
                <hr />
                <h4 className="text-left">photography.</h4>
                <hr />
			</div>
		</div>
    );
  }
}

export default Art;
