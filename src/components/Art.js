import React, { Component} from "react";
import FadeInImage from "./Gallery/FadeInImage.js";
import LightBox from "./Gallery/LightBox.js";
import { Drawings, Photos } from "./Gallery/GalleryImages.js"

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
                <div className="content eighty">
                    { this.state.lightbox }
                    <div className="text-left gallery-header">artwork.</div>
                        <div className="gallery">
                            { Drawings.map(d => <FadeInImage key={d.src} 
                                                             src={d.src} 
                                                             preloadSrc={d.preload} 
                                                             width={d.width}
                                                             height={d.height}
                                                             onClick={this.showLightbox.bind(this, d.big)}/> ) }
                        </div>
                    <hr />
                    <div className="text-left gallery-header">photography.</div>
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
