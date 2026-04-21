import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FlipLabel from './FlipLabel.js';

const LabelChangeTimeout = 3000;

function FlipLabelPool({ labels }) {
    const [activeLabel, setActiveLabel] = useState(
        labels && labels.length ? 0 : null
    );
    const timeoutRef = useRef(null);

    useEffect(() => {
        setActiveLabel(labels && labels.length ? 0 : null);
    }, [labels]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const changeToNextLabel = () => {
        if (!labels || labels.length <= 1) return;
        setActiveLabel(prev => {
            let next;
            do {
                next = Math.floor(Math.random() * labels.length);
            } while (next === prev);
            return next;
        });
    };

    const finalLabelShown = () => {
        timeoutRef.current = setTimeout(changeToNextLabel, LabelChangeTimeout);
    };

    if (activeLabel == null || !labels || !labels.length) return <div></div>;

    return (
        <div>
            <FlipLabel label={labels[activeLabel]} onComplete={finalLabelShown} />
        </div>
    );
}

FlipLabelPool.propTypes = {
    labels: PropTypes.array.isRequired,
};

export default FlipLabelPool;
