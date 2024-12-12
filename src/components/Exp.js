import React, { Component} from "react";

class Work extends Component{
    render(){
        return(
            <div>
                <div className="info inline">
                    <div><a href="https://docs.google.com/document/d/1VYi-Egqs-q6asGI2xaIbvxQdRwiHmkFRtyhrpIbHgYE/edit?usp=sharing">Resume</a></div> | <div><a href="www.linkedin.com/in/armandolocay">LinkedIn</a></div>
                </div>
                <div className="content half">
                    
                    <div className="text-left work-entry">
                        OfferUp, Inc. (April 2020 - December 2024)
                        <hr />
                        <p>Various backend Spring microservices for importing millions of jobs and property rentals, handling searching, and direct job posts.</p>
                        <p>Internal administration web application for user by customer service, sales, and other engineers.</p>
                        <p><a href="http://www.militaryaerospace.com/articles/2014/02/northrop-spectrum-monitoring.html">Related Article</a></p>
                    </div>

                    <div className="text-left work-entry">
                        Northrop Grumman Corporation (Sep 2015 - March 2020)
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
                        <a href="https://github.com/alocay/announcord">Announcord</a> (2018-2023)
                        <hr />
                        <p>A simple discord bot to announce users as they enter and exit voice channels. Utilizes Amazon's Polly TTS service and allows for various user greeting and voice options.</p>
                    </div>

                    <div className="text-left work-entry">
                        <a href="https://alocay.github.io/react-image-fuzzy">React Fuzzy</a> (2018)
                        <hr />
                        <p>A React component implementation of FuzzyJS (below)</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        FuzzyJS (2014)
                        <hr />
                        <p>A simple image filter/processing JavaScript library.</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Potential Fields (2014)
                        <hr />
                        <p>Basic potential fields visualization using paper.js v0.9.20.</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        Flies (2014)
                        <hr />
                        <p>Flock algorithm visualization based on various boids algorithms with some tweaks using paper.js v0.9.20 (based primarily around Processing.js)</p>
                    </div>
                    
                    <div className="text-left work-entry">
                        <a href="https://alocay.github.io/escape-minigame/">Escape</a> (2014)
                        <hr />
                        <p>A basic (unfinished) mini-game exploring various aspects including masking and shadows using paper.js v0.9.20.</p>
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

export default Work;
