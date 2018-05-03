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
		</div>
    );
  }
}

export default Work;
