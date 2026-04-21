import React from 'react';
import '../../css/contact.css';

const LINKS = [
    { platform: 'Email', label: 'alocay@gmail.com', href: 'mailto:alocay@gmail.com' },
    { platform: 'GitHub', label: 'github.com/alocay', href: 'https://github.com/alocay' },
    { platform: 'LinkedIn', label: 'linkedin.com/in/armandolocay', href: 'https://www.linkedin.com/in/armandolocay' },
    { platform: 'Stack Overflow', label: 'stackoverflow.com', href: 'https://stackoverflow.com/users/278447/fizz?tab=profile' },
];

function Contact() {
    return (
        <div className="contact">
            <div className="contact__label">Get in touch</div>
            <div className="contact__links">
                {LINKS.map(({ platform, label, href }) => (
                    <div className="contact__link-row" key={platform}>
                        <span className="contact__link-platform">{platform}</span>
                        <a className="contact__link-value" href={href} target="_blank" rel="noopener noreferrer">
                            {label}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Contact;
