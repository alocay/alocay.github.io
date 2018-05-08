import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Min = 43;
const Max = 122;
const Iterations = 5;
const ChangeTimeout = 1500;

class FlipChar extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            symbol: null,
            iteration: 0
        };
    }
    
    componentDidMount() {
        this.changeSymbol();
    }
    
    changeSymbol() {
        // Add a delay to the first flip if necessary
        const timeout = (this.props.delay > 0 && this.state.iteration == 0) ? (ChangeTimeout + this.props.delay) : ChangeTimeout;
        
        console.log(this.props.finalChar + ' | ' + this.state.iteration + ' | ' + timeout);
        
        if (this.state.iteration < Iterations) {
            this.setState({ symbol: String.fromCharCode(this.getNewRandomSymbol()), iteration: this.state.iteration + 1 }, () => {
                setTimeout(this.changeSymbol.bind(this), ChangeTimeout); 
            });
        }
        else {
            this.setState({ symbol: this.props.finalChar });
        }
    }
    
    getNewRandomSymbol() {
        return Math.floor(Math.random() * (Max - Min) + Min);
    }
    
    render(){
        return(
            <span className="flip-char">{this.state.symbol}</span>
        );
    }
}

FlipChar.propTypes = {
    finalChar: PropTypes.string.isRequired,
    delay: PropTypes.number
};

FlipChar.defaultPropTypes = {
    finalChar: '#',
    delay: 0
}

export default FlipChar;
