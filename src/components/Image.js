import React, { Component} from "react";
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const NoImageSrc = "../assets/no_image.png";

class Image extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            loaded: false;
        };
    }
    
    render(){
        return (
            <div className="image-container">
                <div className="image-loaded"
        this.props.src ? 
            <img src='${this.props.src}' onLoad={this.onImageLoaded} width='${this.props.width} height={this.props.height} /> :
            <img className="no-image" src={NoImageSrc} />
            </div>
        );
    }
}

Image.propTypes = {
    src: React.PropTypes.string.isRequired,
    maxWidth: React.PropTypes.number,
    height: React.PropTypes.number
};

Image.defaultProps = {
    maxWidth: 100
};

export default Image;
