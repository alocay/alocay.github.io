import React, { Component} from "react";
import FadeInImage from "./FadeInImage.js";
import LightBox from "./LightBox.js";
import { Drawings, Photos } from "./GalleryImages.js"

class Art extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            lightbox: null
        }
    }
    
    showLightbox(imageDetails) {
        this.setState({
            lightbox: <LightBox src={imageDetails.src}
                                preloadSrc={imageDetails.preload}
                                width={imageDetails.width}
                                height={imageDetails.height}
                                caption={imageDetails.caption}
                                offsetHeight={true}
                                onClose={this.closeLightbox.bind(this)} />
        });
    }
    
    closeLightbox() {
        this.setState({ lightbox: null });
    }
    
    render(){
        return(
            <div>
                <div className="title">
                    <ul>
                        <li>Art/Photography.</li>
                    </ul>
                </div>
                <div className="content full">
                    { this.state.lightbox }
                    <h4 className="text-left">artwork.</h4>
                        <div className="gallery">
                            { Drawings.map(d => <FadeInImage key={d.src} 
                                                             src={d.src} 
                                                             preloadSrc={d.preload} 
                                                             width={d.width}
                                                             height={d.height}
                                                             onClick={this.showLightbox.bind(this, d.big)}/> ) }
                        </div>
                    <hr />
                    <h4 className="text-left">photography.</h4>
                        <div className="gallery">
                            { Photos.map(d => <FadeInImage key={d.src} 
                                                           src={d.src} 
                                                           preloadSrc={d.preload} 
                                                           width={d.width}
                                                           height={d.height}
                                                           onClick={this.showLightbox.bind(this, d.big)} /> ) }
                        </div>
                    <hr />
                </div>
            </div>
        );
    }
}

export default Art;
