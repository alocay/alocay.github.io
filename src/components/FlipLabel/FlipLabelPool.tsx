import React, { useState, useEffect, useRef } from 'react';
import FlipLabel from './FlipLabel';

const LabelChangeTimeout = 3000;

interface FlipLabelPoolProps {
    labels: string[];
}

function FlipLabelPool({ labels }: FlipLabelPoolProps) {
    const getRandomIndex = (len: number) => Math.floor(Math.random() * len);

    const [activeLabel, setActiveLabel] = useState<number | null>(() =>
        labels && labels.length ? getRandomIndex(labels.length) : null
    );
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const seenRef = useRef<Set<number>>(new Set(activeLabel !== null ? [activeLabel] : []));

    useEffect(() => {
        const initial = labels && labels.length ? getRandomIndex(labels.length) : null;
        setActiveLabel(initial);
        seenRef.current = new Set(initial !== null ? [initial] : []);
    }, [labels]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const changeToNextLabel = () => {
        if (!labels || labels.length <= 1) return;
        setActiveLabel(prev => {
            const unseen = labels
                .map((_, i) => i)
                .filter(i => i !== prev && !seenRef.current.has(i));
            const pool = unseen.length > 0 ? unseen : labels.map((_, i) => i).filter(i => i !== prev);
            if (pool.length === 0) return prev;
            const next = pool[Math.floor(Math.random() * pool.length)];
            seenRef.current.add(next);
            if (seenRef.current.size >= labels.length) {
                seenRef.current = new Set();
            }
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
