import React, { useState } from 'react';
import FadeInImage from './Gallery/FadeInImage.js';
import LightBox from './Gallery/LightBox.js';
import { Drawings, Photos } from './Gallery/GalleryImages.js';
import '../../css/art-page.css';

function Art() {
    const [lightbox, setLightbox] = useState(null);

    const closeLightbox = () => setLightbox(null);

    const showLightbox = (imageDetails) => {
        setLightbox(
            <LightBox
                src={imageDetails.src}
                preloadSrc={imageDetails.preload}
                width={imageDetails.width}
                height={imageDetails.height}
                caption={imageDetails.caption}
                offsetHeight={true}
                onClose={closeLightbox}
            />
        );
    };

    return (
        <div className="art-page">
            {lightbox}
            <div className="art-page__section">
                <div className="art-page__section-label">Artwork</div>
                <div className="gallery">
                    {Drawings.map(d => (
                        <FadeInImage
                            key={d.src}
                            src={d.src}
                            preloadSrc={d.preload}
                            width={d.width}
                            height={d.height}
                            onClick={() => showLightbox(d.big)}
                        />
                    ))}
                </div>
            </div>
            <div className="art-page__divider" />
            <div className="art-page__section">
                <div className="art-page__section-label">Photography</div>
                <div className="gallery">
                    {Photos.map(d => (
                        <FadeInImage
                            key={d.src}
                            src={d.src}
                            preloadSrc={d.preload}
                            width={d.width}
                            height={d.height}
                            onClick={() => showLightbox(d.big)}
                        />
                    ))}
                </div>
            </div>
            <div className="art-page__divider" />
            <div className="art-page__coming-soon">
                <p className="art-page__coming-soon-text">More projects coming soon — woodworking, mead making, and beyond.</p>
            </div>
        </div>
    );
}

export default Art;
