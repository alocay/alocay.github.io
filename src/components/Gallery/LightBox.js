import React from 'react';
import PropTypes from 'prop-types';
import FadeInImage from './FadeInImage.js';

function LightBox({ src, preloadSrc, caption, width, height, offsetHeight, onClose }) {
    const onLightBoxClicked = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className="light-box" onClick={onLightBoxClicked}>
            <div className="light-box-image">
                <FadeInImage
                    src={src}
                    preloadSrc={preloadSrc}
                    caption={caption}
                    width={width}
                    height={height}
                    offsetHeight={offsetHeight}
                />
            </div>
        </div>
    );
}

LightBox.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    offsetHeight: PropTypes.bool,
    caption: PropTypes.string,
};

export default LightBox;
