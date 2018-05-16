import React, { Component} from "react";
import PropTypes from 'prop-types';
import FadeInImage from "./FadeInImage.js";

class LightBox extends Component{
    onLightBoxClicked(e) {
        e.stopPropagation();
        
        this.props.onClose();
    }
    
    render() {
        return(
            <div className="light-box" onClick={this.onLightBoxClicked.bind(this)}>
                <div className="light-box-image">
                    <FadeInImage src={this.props.src} 
                                 preloadSrc={this.props.preloadSrc} 
                                 caption={this.props.caption} 
                                 width={this.props.width} 
                                 height={this.props.height} 
                                 offsetHeight={this.props.offsetHeight} />
                </div>
            </div>
        );
    }
}

LightBox.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    offsetHeight: PropTypes.bool,
    caption: PropTypes.string
};

FadeInImage.defaultPropTypes = {
    offsetHeight: false
}

export default LightBox;
