import React, { Component} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sprintf } from 'sprintf-js';
import classnames from 'classnames';

const NoImageSrc = "../assets/no_image.png";
const calcHeightFormat = 'calc(%upx - 100px + %s)';
const captionOffset = '35px';

class FadeInImage extends Component{
    constructor(props) {
        super(props);
        
        this.imageFinal = null;
        
        this.state = {
            loaded: false
        };
    }
    
    componentDidMount() {
        const imageLoader = new Image();
        
        imageLoader.src = this.props.src;
        imageLoader.onload = this.onImgLoaded.bind(this);
    }
    
    onImgLoaded() {
        this.imageFinal.src = this.props.src;
        this.imageFinal.classList.add('image-fade-in');
    }
    
    getImageStyle(offset) {
        if (!offset)
            offset = '0px';
        
        if (!this.props.offsetHeight)
            return { width: this.props.width, height: this.props.height, maxWidth: this.props.width, maxHeight: this.props.height };
        
        return { width: this.props.width, 
                 height: sprintf(calcHeightFormat, this.props.height, offset), 
                 maxWidth: this.props.width, 
                 maxHeight: sprintf(calcHeightFormat, this.props.height, offset) };
    }
    
    render() {
        
        const imageStyle = this.getImageStyle();
        const containerStyle = this.getImageStyle(captionOffset);
        
        return (
            <div className="image-container" onClick={this.props.onClick} style={containerStyle}>
                <figure className="loaded-image" style={imageStyle}>
                    <img className="image-final" ref={ finalImageElement => this.imageFinal = finalImageElement } />
                    <figcaption className="text-left">{this.props.caption}</figcaption>
                </figure>
                <img className="image-preload" src={this.props.preloadSrc} style={imageStyle}/>
            </div>
        );
    }
}

FadeInImage.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    caption: PropTypes.string,
    offsetHeight: PropTypes.bool,
    onClick: PropTypes.func
};

FadeInImage.defaultPropTypes = {
    width: 215,
    height: 215,
    offsetHeight: false
}

export default FadeInImage;
