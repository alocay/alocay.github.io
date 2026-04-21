import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Min = 43;
const Max = 122;
const Iterations = 10;
const ChangeTimeout = 60;

class FlipChar extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            symbol: null,
            iteration: 0
        };
    }
    
    componentDidMount() {
        this._scheduleStart();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.finalChar) {
            this.setState({ iteration: 0 }, this._scheduleStart.bind(this));
        }
    }

    _scheduleStart() {
        const delay = this.props.delay || 0;
        if (delay > 0) {
            setTimeout(this.changeSymbol.bind(this), delay);
        } else {
            this.changeSymbol();
        }
    }

    changeSymbol() {
        if (this.state.iteration < Iterations) {
            this.setState(
                prev => ({ symbol: this.getNewRandomSymbol(), iteration: prev.iteration + 1 }),
                () => { setTimeout(this.changeSymbol.bind(this), ChangeTimeout); }
            );
        } else {
            this.setState({ symbol: this.props.finalChar });
            if (this.props.onComplete)
                this.props.onComplete();
        }
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
