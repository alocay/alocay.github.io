import React, { useState, useEffect, useRef } from 'react';

const Min = 43;
const Max = 122;
const Iterations = 10;
const ChangeTimeout = 60;

interface FlipCharProps {
    finalChar: string;
    delay?: number;
    onComplete?: () => void;
}

function FlipChar({ finalChar, delay, onComplete }: FlipCharProps) {
    const [symbol, setSymbol] = useState<string | null>(null);
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

export default FlipChar;
