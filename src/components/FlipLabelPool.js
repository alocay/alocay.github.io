import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlipLabel from './FlipLabel.js';

const LabelChangeTimeout = 5000;

class FlipLabelPool extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            activeLabel: null
        };
    }
    
    componentDidMount() {
        this.initState(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.initState(nextProps);
    }
    
    initState(props) {
        if (props.labels && props.labels.length) {
            this.setState({ activeLabel: 0 });
        } else {
            this.setState({ activeLabel: null });
        }
    }
    
    changeToNextLabel() {
        console.log('changing labels...');
        const newActiveLabel = (this.state.activeLabel + 1) % this.props.labels.length;
        this.setState({ activeLabel: newActiveLabel });
    }
    
    finalLabelShown() {
        setTimeout(this.changeToNextLabel.bind(this), LabelChangeTimeout);
    }
    
    render(){
        if (this.state.activeLabel == null || !this.props.labels || !this.props.labels.length) return (<div></div>);
        
        return(
            <div>{ <FlipLabel label={this.props.labels[this.state.activeLabel]} onComplete={this.finalLabelShown.bind(this)} /> }</div>
        );
    }
}

FlipLabelPool.propTypes = {
    labels: PropTypes.array.isRequired
};

export default FlipLabelPool;
