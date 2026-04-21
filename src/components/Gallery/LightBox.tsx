import React from 'react';
import FadeInImage from './FadeInImage';

interface LightBoxProps {
    src: string;
    preloadSrc: string;
    caption?: string;
    width: number;
    height: number;
    offsetHeight?: boolean;
    onClose: () => void;
}

function LightBox({ src, preloadSrc, caption, width, height, offsetHeight, onClose }: LightBoxProps) {
    const onLightBoxClicked = (e: React.MouseEvent) => {
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

export default LightBox;
