import React, { useState } from 'react';
import FadeInImage from './Gallery/FadeInImage';
import LightBox from './Gallery/LightBox';
import { Drawings, Photos, GalleryImageDetail } from './Gallery/GalleryImages';
import '../../css/art-page.css';

type Section = 'artwork' | 'photography' | 'woodworking' | 'mead' | null;

function Art() {
    const [openSection, setOpenSection] = useState<Section>(null);
    const [lightbox, setLightbox] = useState<React.ReactElement | null>(null);

    const toggleSection = (section: Exclude<Section, null>) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    const closeLightbox = () => setLightbox(null);

    const showLightbox = (imageDetails: GalleryImageDetail) => {
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

    const isOpen = (section: Exclude<Section, null>) => openSection === section;

    return (
        <div className="art-page">
            {lightbox}

            {/* Artwork */}
            <div className="art-page__section">
                <div
                    className="art-page__section-header"
                    onClick={() => toggleSection('artwork')}
                >
                    <div className="art-page__section-left">
                        <span className="art-page__section-label">Artwork</span>
                        <span className="art-page__section-count">{Drawings.length}</span>
                    </div>
                    <span className={`art-page__chevron${isOpen('artwork') ? ' art-page__chevron--open' : ''}`}>▼</span>
                </div>
                <div className={`art-page__section-body${isOpen('artwork') ? ' art-page__section-body--open' : ''}`}>
                    <div className="art-page__gallery">
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
            </div>

            {/* Photography */}
            <div className="art-page__section">
                <div
                    className="art-page__section-header"
                    onClick={() => toggleSection('photography')}
                >
                    <div className="art-page__section-left">
                        <span className="art-page__section-label">Photography</span>
                        <span className="art-page__section-count">{Photos.length}</span>
                    </div>
                    <span className={`art-page__chevron${isOpen('photography') ? ' art-page__chevron--open' : ''}`}>▼</span>
                </div>
                <div className={`art-page__section-body${isOpen('photography') ? ' art-page__section-body--open' : ''}`}>
                    <div className="art-page__gallery">
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
            </div>

            {/* Woodworking */}
            <div className="art-page__section">
                <div
                    className="art-page__section-header"
                    onClick={() => toggleSection('woodworking')}
                >
                    <div className="art-page__section-left">
                        <span className="art-page__section-label">Woodworking</span>
                    </div>
                    <span className={`art-page__chevron${isOpen('woodworking') ? ' art-page__chevron--open' : ''}`}>▼</span>
                </div>
                <div className={`art-page__section-body${isOpen('woodworking') ? ' art-page__section-body--open' : ''}`}>
                    <p className="art-page__coming-soon-inline">Content coming soon.</p>
                </div>
            </div>

            {/* Mead Making */}
            <div className="art-page__section">
                <div
                    className="art-page__section-header"
                    onClick={() => toggleSection('mead')}
                >
                    <div className="art-page__section-left">
                        <span className="art-page__section-label">Mead Making</span>
                    </div>
                    <span className={`art-page__chevron${isOpen('mead') ? ' art-page__chevron--open' : ''}`}>▼</span>
                </div>
                <div className={`art-page__section-body${isOpen('mead') ? ' art-page__section-body--open' : ''}`}>
                    <p className="art-page__coming-soon-inline">Content coming soon.</p>
                </div>
            </div>
        </div>
    );
}

export default Art;
