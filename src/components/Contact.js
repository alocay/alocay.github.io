import React, { Component} from "react";

class Contact extends Component{
  render(){
    return(
		<div>
			<div className="content contact text-left">
                <div className="text-left"><a href="mailto:alocay@gmail.com">alocay@gmail.com</a></div> 
                <div className="text-left"><a href="http://github.com/alocay">GitHub</a></div>
                <div className="text-left"><a href="https://www.linkedin.com/in/armandolocay">LinkedIn</a></div>
                <div className="text-left"><a href="https://stackoverflow.com/users/278447/fizz?tab=profile">Stackoverflow</a></div>
                <div className="text-left"><a href="https://stackoverflow.com/story/alocay">Stackoverflow Story</a></div>
			</div>
		</div>
    );
  }
}

export default Contact;
