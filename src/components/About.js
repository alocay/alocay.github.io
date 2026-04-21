import React, { Component } from 'react';
import FlipLabelPool from './FlipLabel/FlipLabelPool.js';
import '../../css/about.css';

const IDENTITY_WORDS = [
    'Developer.',
    'Artist.',
    'Gamer.',
    'Woodworker.',
    'Mead Maker.',
    'Hiker.',
    'Traveler.',
];

class About extends Component {
    render() {
        return (
            <div className="about">
                <div className="about__iam-label">I am a</div>
                <div className="about__name">Armando Locay.</div>
                <div className="about__flip-word">
                    <FlipLabelPool labels={IDENTITY_WORDS} />
                </div>
                <div className="about__bio">
                    <div className="about__bio-rule" />
                    <p className="about__bio-text">
                        Software engineer with 10+ years building products across defense,
                        tech, and more. I design and write code by day and make art,
                        woodwork, mead, and tools by night.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;
