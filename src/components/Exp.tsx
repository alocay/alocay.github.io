import React from 'react';
import '../../css/exp.css';

const PROFESSIONAL = [
    {
        company: 'Apollo GraphQL',
        dates: '2025 – Present',
        current: true,
        description: 'Building the Apollo MCP Server as well as API/MCP gateways for the Apollo ecosystem. Working on expanding the developer tooling and platform features for the Apollo Studio ecosystem.',
    },
    {
        company: 'OfferUp',
        dates: 'April 2020 – December 2024',
        description: 'Various backend Spring microservices for importing millions of jobs and property rentals, handling searching, and direct job posts. Internal administration web application for use by customer service, sales, and other engineers.',
    },
    {
        company: 'Northrop Grumman',
        dates: 'Sep 2015 – March 2020',
        description: 'Wideband Remote Monitoring Sensor (WRMS) application — a desktop and web application for monitoring satellite data and alerting on anomalies.',
    },
    {
        company: 'Microsoft',
        dates: 'June 2013 – Sep 2015',
        description: 'Windows Phone Companion Application for Windows 8. Windows Phone Podcast Application. Microsoft Maps platform components for Windows 10 and Windows Phone.',
    },
];

const PROJECTS = [
    {
        name: 'Announcord',
        url: 'https://github.com/alocay/announcord',
        dates: '2018 – 2023',
        description: 'Discord bot that announces users entering and exiting voice channels using Amazon Polly TTS with customizable greetings and voice options.',
    },
    {
        name: 'React Fuzzy / FuzzyJS',
        url: 'https://alocay.github.io/react-image-fuzzy',
        dates: '2014 – 2018',
        description: 'FuzzyJS is an image filter/processing JavaScript library. React Fuzzy is a React component wrapper around it.',
    },
    {
        name: 'Potential Fields / Flies',
        url: null,
        dates: '2014',
        description: 'Potential fields visualization and boids flock algorithm visualization, both built with paper.js.',
    },
    {
        name: 'Escape',
        url: 'https://alocay.github.io/escape-minigame/',
        dates: '2014',
        description: 'A mini-game exploring masking and shadows using paper.js.',
    },
];

function Exp() {
    return (
        <div className="exp">
            <div className="exp__column">
                <div className="exp__col-label">Professional</div>
                {PROFESSIONAL.map((entry) => (
                    <div className="exp__entry" key={entry.company}>
                        <div className="exp__entry-header">
                            <span className="exp__company">{entry.company}</span>
                            {entry.current && <span className="exp__current-badge">Current</span>}
                        </div>
                        <div className="exp__dates">{entry.dates}</div>
                        <p className="exp__description">{entry.description}</p>
                    </div>
                ))}
            </div>
            <div className="exp__column">
                <div className="exp__col-label">Projects</div>
                {PROJECTS.map((project) => (
                    <div className="exp__entry" key={project.name}>
                        <div className="exp__project-company">
                            {project.url
                                ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                                : project.name}
                        </div>
                        <div className="exp__dates">{project.dates}</div>
                        <p className="exp__description">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exp;
