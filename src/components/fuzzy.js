import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Fuzzy extends Component{
    constructor(props) {
        super(props);
        
        this.originalImage = null;
        this.imageFinal = null;
        this.imageData = null;
        this.canvasRef = React.createRef();
        this.canvasContext = null;
        this.width = 0;
        this.height = 0;
    }
    
    componentDidMount() {
        this.originalImage = new Image();
        
        this.originalImage.src = this.props.url;
        this.originalImage.onload = this.onImgLoaded.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.color) {
            this.processImage(nextProps.color, nextProps.useImg);
        }
    }
    
    onImgLoaded() {
        this.canvasRef.current.width = this.originalImage.width;
        this.canvasRef.current.height = this.originalImage.height;
        this.canvasContext = this.canvasRef.current.getContext("2d");
        this.canvasContext.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);
        this.imageData = this.canvasContext.getImageData(0, 0, this.originalImage.width, this.originalImage.height);
        
        this.processImage(this.props.color, this.props.useImg);
    }
    
    processImage(color, useImg) {        
        console.log('color: ' + color);
        for (var i = 0; i < this.imageData.data.length; i += 4) {
            // simply set the pixels not related to the specified color to 0
            switch (color) {
                case 'red':
                    this.imageData.data[i + 1] = 0;
                    this.imageData.data[i + 2] = 0;
                break;
                case 'green':
                    this.imageData.data[i] = 0;
                    this.imageData.data[i + 2] = 0;
                break;
                case 'blue':
                    this.imageData.data[i] = 0;
                    this.imageData.data[i + 1] = 0;
                break;
            }
        }
        
        this.canvasContext.putImageData(this.imageData, 0, 0);
        
        if (useImg)  {
            this.imageFinal.src = this.canvasRef.current.toDataURL();
        }
    }
    
    render(){
        return(
            <div>
                <canvas className={classnames({"hide": this.props.useImg})} ref={this.canvasRef} />
                { this.props.useImg ? <img className="image-final" ref={ finalImageElement => this.imageFinal = finalImageElement } /> : null}
            </div>
        );
    }
}

Fuzzy.propTypes = {
    url: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    useImg: PropTypes.bool
};

Fuzzy.defaultPropTypes = {
    useImg: false
}

export default Fuzzy;
