import React, { Component} from "react";

class Work extends Component{
  render(){
    return(
		<div>
			<div className="title">
				<ul>
					<li>Experience.</li>
                    <li className="subtitle"><a href="">Resume.</a></li>
                    <li className="subtitle"><a href="https://stackoverflow.com/cv/alocay">Stackoverflow CV.</a></li>
				</ul>
			</div>
			<div className="content">
                <div class="parallax"></div>
                
                <div className="text-left">
                    Northrop Grumman Corporation (Sep 2015 - Present)
                    <hr />
                    <p>Developing the Wideband Remote Monitoring Sensor (WRMS) application used for monitoring planned satellite communication and alerting about any detect anomalies. 
                       Besides working on the main desktop application, I also heavily helped architecture the associated enterprise web application.</p>
                    <p>Throughout this project I have worked with a various languages and frameworks including C# Winforms, Windows Services, MSMQ, SignalR, 
                       ASP.NET, NodeJS, ReactJS, Redux (and other various NodeJS packages and libraries), Powershell, and others.</p>
                    <p><a href="http://www.militaryaerospace.com/articles/2014/02/northrop-spectrum-monitoring.html">Related Article</a></p>
                </div>
                
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="w30">Professional</th>
                                <th className="w15">Dates</th>
                                <th>What?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Microsoft Corporation</td>
                                <td>2011-2015</td>
                                <td>
                                    <ul>
                                        <li>Windows Phone Companion Application for Windows 8</li>
                                        <li>Windows Phone Podcast Application</li>
                                        <li>Windows 8 Maps Platform Components</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Northrop Grumman Corporation</td>
                                <td>2015-Present</td>
                                <td>
                                    <ul>
                                        <li>Wideband Remote Monitoring Sensor</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Personal Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Memofire</td>
                                <td>2011</td>
                                <td>
                                    <ul className="unstyled">
                                        <li>A Ruby on Rails flashcard studying application (contributed)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>FuzzyJS</td>
                                <td>2014</td>
                                <td>
                                    <ul className="unstyled">
                                        <li>A simple pure javascript client-side image processing library (authored)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Various simple PaperJS experiments</td>
                                <td>2014</td>
                                <td>
                                    <ul className="unstyled">
                                        <li>Various experiments with PaperJS including the beginning of a simple game, a visualization of navigation via potential fields, and a flock alogrithm visualizaiton.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Various game prototypes</td>
                                <td>2017-Present</td>
                                <td>
                                    <ul className="unstyled">
                                        <li>Various game prototypes and renditions that have involved, at different moments, Lua, C#, OpenTK, and Unity.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="parallax"></div>
			</div>
		</div>
    );
  }
}

export default Work;
