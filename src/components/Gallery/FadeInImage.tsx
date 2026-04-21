import React, { useRef, useEffect } from 'react';
import { sprintf } from 'sprintf-js';

const calcHeightFormat = 'calc(%upx + %s)';
const captionOffset = '0px';

interface FadeInImageProps {
    src: string;
    preloadSrc: string;
    width: number;
    height: number;
    caption?: string;
    offsetHeight?: boolean;
    onClick?: () => void;
}

function FadeInImage({ src, preloadSrc, width, height, caption, offsetHeight, onClick }: FadeInImageProps) {
    const imageFinalRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = src;
        imageLoader.onload = () => {
            if (imageFinalRef.current) {
                imageFinalRef.current.src = src;
                imageFinalRef.current.classList.add('image-fade-in');
            }
        };
    }, [src]);

    const getImageStyle = (offset?: string): React.CSSProperties => {
        if (!offset) offset = '0px';
        if (!offsetHeight)
            return { width, height, maxWidth: width, maxHeight: height };
        return {
            width,
            height: sprintf(calcHeightFormat, height, offset),
            maxWidth: width,
            maxHeight: sprintf(calcHeightFormat, height, offset),
        };
    };

    const imageStyle = getImageStyle();
    const containerStyle = getImageStyle(captionOffset);

    return (
        <div className="image-container" onClick={onClick} style={containerStyle}>
            <figure className="loaded-image" style={imageStyle}>
                <img className="image-final" ref={imageFinalRef} />
                <figcaption className="text-left">{caption}</figcaption>
            </figure>
            <img className="image-preload" src={preloadSrc} style={imageStyle} />
        </div>
    );
}

export default FadeInImage;
