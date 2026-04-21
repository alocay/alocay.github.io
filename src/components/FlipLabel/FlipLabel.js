import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipChar from './FlipChar.js';

function FlipLabel({ label, onComplete }) {
    const completedCharsRef = useRef(0);
    const labelChars = label ? label.split('') : [];

    useEffect(() => {
        completedCharsRef.current = 0;
    }, [label]);

    const handleCharComplete = () => {
        completedCharsRef.current += 1;
        if (completedCharsRef.current >= labelChars.length && onComplete) {
            onComplete();
        }
    };

    return (
        <div className="flip-label">
            {labelChars.map((c, i) => (
                <FlipChar key={i} finalChar={c} delay={i * 250} onComplete={handleCharComplete} />
            ))}
        </div>
    );
}

FlipLabel.propTypes = {
    label: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
};

export default FlipLabel;
