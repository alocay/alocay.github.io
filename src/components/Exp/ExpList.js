import React, { Component} from "react";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import FuzzyDemo from "./FuzzyDemo.js";

class ExpList extends Component{
    render(){
        return(
            <div>
                <div className="info inline">
                    <div><a href="">Resume</a></div> | <div><a href="https://stackoverflow.com/cv/alocay">Stackoverflow CV.</a></div>
                </div>
                <div className="content half">
                    
                    <div className="text-left work-entry">
                        Northrop Grumman Corporation (Sep 2015 - Present)
                        <hr />
                        <p>Wideband Remote Monitoring Sensor (WRMS) application, a desktop and web application used for monitoring satellite data as well as alert on any anomalies. </p>
                        <p><a href="http://www.militaryaerospace.com/articles/2014/02/northrop-spectrum-monitoring.html">Related Article</a></p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Microsoft Corporation (June 2013 - Sep 2015)
                        <hr />
                        <p>Windows Phone Companion Application for Windows 8</p>                            
                        <p><a href="https://www.windowscentral.com/hands-new-podcast-app-windows-phone-81">Windows Phone Podcast Application</a></p>
                        <p>Microsoft Maps platform components for both Windows 10 and Windows Phone</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        <a href="http://alocay.github.io/projects/fuzzyjs/index.html">FuzzyJS</a> (2014)
                        <hr />
                        <p>A simple image filter/processing JavaScript library.</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        <a href="https://alocay.github.io/react-image-fuzzy">React Fuzzy</a> (2018)
                        <hr />
                        <p>A React component implementation of FuzzyJS</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Potential Fields (2014)
                        <hr />
                        <p>Basic potential fields visualization using paper.js.</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Flies (2014)
                        <hr />
                        <p>Flock algorithm visualization based on various boids algorithms with some tweaks using paper.js (based primarily around Processing.js)</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Escape (2014)
                        <hr />
                        <p>A basic (unfinished) game exploring masking and shadows using paper.js.</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Memofire (2011) <i>defunct</i>
                        <hr />
                        <p>A Ruby on Rails flashcard studying application (contributor).</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpList;
