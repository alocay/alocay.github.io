import React, { useState, useEffect, useRef } from 'react';
import FlipLabel from './FlipLabel';

const LabelChangeTimeout = 3000;

interface FlipLabelPoolProps {
    labels: string[];
}

function FlipLabelPool({ labels }: FlipLabelPoolProps) {
    const [activeLabel, setActiveLabel] = useState<number | null>(
        labels && labels.length ? 0 : null
    );
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            let next: number;
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

export default FlipLabelPool;
