import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlipChar from './FlipChar.js';

class FlipLabel extends Component{
    constructor(props) {
        super(props);
        
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
            this.setState({ labelChars: nextProps.label.split('') });
        }
    }
    
    getFlipChars() {
        return this.state.labelChars.map((c, i) => <FlipChar key={i} finalChar={c} delay={(i * 3000)}/>);
    }
    
    render(){
        return(
            <div>{ this.getFlipChars() }</div>
        );
    }
}

FlipLabel.propTypes = {
    label: PropTypes.string.isRequired
};

export default FlipLabel;
