import React, { Component} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const NoImageSrc = "../assets/no_image.png";

class FadeInImage extends Component{
    constructor(props) {
        super(props);
        
        this.imageFinal = null;
        
        this.state = {
            loaded: false
        };
    }
    
    componentDidMount() {
        this.imageFinal = new Image();
        
        this.imageFinal.src = this.props.src;
        this.imageFinal.onload = () => { this.setState({ loaded: true }); }; 
    }
    
    onImgLoaded() {
        this.imageFinal.src = this.props.src;
        this.imageFinal.classList.add('image-fade-in');
    }
    
    render() {
        return (
            <div className="image-container">
                { this.state.loaded ? this.imageFinal : null }
                <img className="preload-image" src={this.props.preloadSrc}/>
            </div>
        );
    }
}

FadeInImage.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    maxWidth: PropTypes.number,
};

FadeInImage.defaultProps = {
    maxWidth: 100
};

export default FadeInImage;
