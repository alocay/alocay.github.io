import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Min = 43;
const Max = 122;
const Iterations = 30;
const ChangeTimeout = 75;

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
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.finalChar) {
            this.setState({ iteration: 0 }, this.undoSymbolAndRepeat.bind(this));
        }
    }
    
    undoSymbolAndRepeat() {
        const timeout = this.getDelayedTimeout();
        setTimeout(this.changeSymbol.bind(this), timeout);
    }
    
    changeSymbol() {
        // Add a delay to the first flip if necessary
        const timeout = this.getDelayedTimeout();
        
        if (this.state.iteration < Iterations) {
            this.setState({ symbol: this.getNewRandomSymbol(), iteration: this.state.iteration + 1 }, () => {
                setTimeout(this.changeSymbol.bind(this), timeout); 
            });
        }
        else {
            this.setState({ symbol: this.props.finalChar });
            if (this.props.onComplete) 
                this.props.onComplete();
        }
    }
    
    getDelayedTimeout() {
        return (this.props.delay > 0 && this.state.iteration == 0) ? (ChangeTimeout + this.props.delay) : ChangeTimeout;
    }
    
    getNewRandomSymbol() {
        const symbolCode = Math.floor(Math.random() * (Max - Min) + Min);
        return String.fromCharCode(symbolCode);
    }
    
    render(){
        return(
            <span className="flip-char">{this.state.symbol}</span>
        );
    }
}

FlipChar.propTypes = {
    finalChar: PropTypes.string.isRequired,
    delay: PropTypes.number,
    onComplete: PropTypes.func
};

FlipChar.defaultPropTypes = {
    finalChar: '#',
    delay: 0
}

export default FlipChar;
