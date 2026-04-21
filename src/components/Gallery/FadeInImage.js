import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { sprintf } from 'sprintf-js';

const calcHeightFormat = 'calc(%upx + %s)';
const captionOffset = '0px';

function FadeInImage({ src, preloadSrc, width, height, caption, offsetHeight, onClick }) {
    const imageFinalRef = useRef(null);

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

    const getImageStyle = (offset) => {
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

FadeInImage.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    caption: PropTypes.string,
    offsetHeight: PropTypes.bool,
    onClick: PropTypes.func,
};

FadeInImage.defaultPropTypes = {
    width: 215,
    height: 215,
    offsetHeight: false,
};

export default FadeInImage;
