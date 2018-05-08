import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlipLabel from './FlipLabel.js';

class FlipGallery extends Component{
    constructor(props) {
        super(props);
    }
    
    getFlipChars() {
        return this.state.labelChars.map((c, i) => <FlipChar key={i} finalChar={c} delay={(i * 250)}/>);
    }
    
    render(){
        return(
            <div className="flip-gallery">{ this.getFlipChars() }</div>
        );
    }
}

FlipGallery.propTypes = {
    labels: PropTypes.object.isRequired
};

export default FlipGallery;
