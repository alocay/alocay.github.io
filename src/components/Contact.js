import React, { Component} from "react";

class Contact extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Contact.</li>
				</ul>
			</div>
			<div className="content">
                <table className="unstyled">
                    <tr>
                        <td>Email:</td>
                        <td>alocay@gmail.com</td>
                    </tr>
                    <tr>
                        <td>LinkedIn:</td>
                        <td>https://github.com/alocay</td>
                    </tr>
                    <tr>
                        <td>Github:</td>
                        <td>https://www.linkedin.com/in/armandolocay</td>
                    </tr>
                    <tr>
                        <td>Stackoverflow:</td>
                        <td>https://stackoverflow.com/users/278447/fizz?tab=profile</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>https://stackoverflow.com/story/alocay</td>
                    </tr>
                </table>
			</div>
		</div>
    );
  }
}

export default Contact;
