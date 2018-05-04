import React, { Component} from "react";
import FadeInImage from "./FadeInImage.js";
import LightBox from "./LightBox.js";

const Drawings = [
    {
        src: require("../../assets/clothflag.png"),
        preload: require("../../assets/clothflag_placeholder.png"),
        width: 215,
        height: 215,
        big: {
            src: require("../../assets/clothflag_big.png"),
            preload: require("../../assets/clothflag_big_placeholder.png"),
            width: 861,
            height: 538,
            caption: "'Flag' - Charcoal on brown paper"
        }
    },
    {
        src: require("../../assets/monster.png"),
        preload: require("../../assets/monster_placeholder.png"),
        width: 215,
        height: 215,
        big: {
            src: require("../../assets/monster_big.png"),
            preload: require("../../assets/monster_big_placeholder.png"),
            width: 1089,
            height: 703,
            caption: "'Sightless Monster' - Charcoal on brown paper"
        }
    },
    {
        src: require("../../assets/squid.png"),
        preload: require("../../assets/squid_placeholder.png"),
        width: 215,
        height: 215,
        big: {
            src: require("../../assets/squid_big.png"),
            preload: require("../../assets/squid_big_placeholder.png"),
            width: 699,
            height: 956,
            caption: "'Squid' - Charcoal on matte paper"
        }
    },
    {
        src: require("../../assets/wineglass.png"),
        preload: require("../../assets/wineglass_placeholder.png"),
        width: 215,
        height: 215,
        big: {
            src: require("../../assets/wineglass_big.png"),
            preload: require("../../assets/wineglass_big_placeholder.png"),
            width: 704,
            height: 825,
            caption: "'Wine Glass' - Charcoal on brown paper"
        }
    },
];

const Photos = [];

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
                        <li>Art.</li>
                    </ul>
                </div>
                <div className="content full">
                    { this.state.lightbox }
                    <h4 className="text-left">sketches.</h4>
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
                            { Photos.map(d => <FadeInImage key={d.src} src={d.src} preloadSrc={d.preload} caption={d.caption} /> ) }
                        </div>
                    <hr />
                </div>
            </div>
        );
    }
}

export default Art;
