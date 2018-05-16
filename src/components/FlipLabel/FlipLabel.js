import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlipChar from './FlipChar.js';

class FlipLabel extends Component{
    constructor(props) {
        super(props);
        
        this.completedChars = 0;
        this.state = {
            labelChars: []
        };
    }
    
    componentDidMount() {
        if (this.props.label) {
            this.setState({ labelChars: this.props.label.split('') });
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.label) {
            this.completedChars = 0;
            this.setState({ labelChars: nextProps.label.split('') });
        }
    }
    
    getFlipChars() {
        return this.state.labelChars.map((c, i) => <FlipChar key={i} finalChar={c} delay={(i * 250)} onComplete={this.onComplete.bind(this)}/>);
    }
    
    onComplete() {
        this.completedChars += 1;
        
        if (this.completedChars >= this.state.labelChars.length && this.props.onComplete) {
            this.props.onComplete();
        }
    }
    
    render(){
        return(
            <div className="flip-label">{ this.getFlipChars() }</div>
        );
    }
}

FlipLabel.propTypes = {
    label: PropTypes.string.isRequired,
    onComplete: PropTypes.func
};

export default FlipLabel;
