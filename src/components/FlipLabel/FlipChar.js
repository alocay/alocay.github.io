import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Min = 43;
const Max = 122;
const Iterations = 10;
const ChangeTimeout = 60;

function FlipChar({ finalChar, delay, onComplete }) {
    const [symbol, setSymbol] = useState(null);
    const iterationRef = useRef(0);

    useEffect(() => {
        iterationRef.current = 0;
        let active = true;

        const getNewRandomSymbol = () => {
            const symbolCode = Math.floor(Math.random() * (Max - Min) + Min);
            return String.fromCharCode(symbolCode);
        };

        const changeSymbol = () => {
            if (!active) return;
            if (iterationRef.current < Iterations) {
                iterationRef.current += 1;
                setSymbol(getNewRandomSymbol());
                setTimeout(changeSymbol, ChangeTimeout);
            } else {
                setSymbol(finalChar);
                if (onComplete) onComplete();
            }
        };

        const timeoutId = setTimeout(changeSymbol, delay || 0);

        return () => {
            active = false;
            clearTimeout(timeoutId);
        };
    }, [finalChar, delay]);

    return <span className="flip-char">{symbol}</span>;
}

FlipChar.propTypes = {
    finalChar: PropTypes.string.isRequired,
    delay: PropTypes.number,
    onComplete: PropTypes.func,
};

FlipChar.defaultPropTypes = {
    finalChar: '#',
    delay: 0,
};

export default FlipChar;
