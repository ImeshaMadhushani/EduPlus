import React from 'react';

// Reusable section component for the footer
const FooterSection = ({ title, children }) => (
    <div>
        <h2 className="text-lg font-semibold text-white"> {/* Increased font size for title */}
            {title}
        </h2>
        {children}
    </div>
);

const FooterLinks = () => (
    <ul className="mt-2 space-y-1"> {/* Increased space between items */}
        {['Courses', 'About Us', 'Contact', 'FAQs'].map((link) => (
            <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-secondary hover:text-accent transition-colors text-base"> {/* Increased font size */}
                    {link}
                </a>
            </li>
        ))}
    </ul>
);

const SocialIcons = () => {
    const icons = [
        { name: 'facebook', path: 'M22.675 0h-21.35C.601 0 0 .601 0 1.326v21.348c0 .725.601 1.326 1.326 1.326H12.82v-9.285H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.591l-.467 3.622h-3.124V24h6.124c.725 0 1.326-.601 1.326-1.326V1.326C24 .601 23.399 0 22.675 0z' },
        { name: 'twitter', path: 'M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.197-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.204-4.92 4.917 0 .39.045.765.127 1.125C7.688 8.094 4.064 6.13 1.64 3.161c-.427.734-.666 1.58-.666 2.476 0 1.708.87 3.213 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.316 0-.623-.03-.923-.086.631 1.953 2.445 3.376 4.604 3.415-1.68 1.319-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.189 1.401 4.768 2.218 7.548 2.218 9.056 0 14.004-7.498 14.004-13.986 0-.21-.004-.42-.014-.63.962-.695 1.797-1.562 2.457-2.549z' },
        { name: 'linkedin', path: 'M22.225 0H1.771C.792 0 0 .771 0 1.718v20.547C0 23.226.792 24 1.771 24h20.451c.979 0 1.778-.771 1.778-1.718V1.718C24 .771 23.203 0 22.225 0zM7.07 20.452H3.765V9.063H7.07v11.389zM5.418 7.547a1.928 1.928 0 01-1.941-1.914c0-1.061.862-1.918 1.941-1.918 1.079 0 1.942.857 1.942 1.918 0 1.057-.863 1.914-1.942 1.914zm15.02 12.905h-3.301v-5.696c0-1.362-.027-3.111-1.894-3.111-1.896 0-2.186 1.482-2.186 3.011v5.796h-3.303V9.063h3.177v1.554h.045c.444-.839 1.532-1.72 3.151-1.72 3.367 0 3.993 2.217 3.993 5.103v6.452z' },
    ];

    return (
        <div className="flex mt-2 space-x-3 justify-center md:justify-start"> {/* Increased spacing between icons */}
            {icons.map((icon) => (
                <a key={icon.name} href={`#${icon.name}`} className="text-background hover:text-accent transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"> {/* Increased icon size */}
                        <path d={icon.path} />
                    </svg>
                </a>
            ))}
        </div>
    );
};

const Footer = () => (
    <footer className="bg-primary text-background py-6"> {/* Increased padding */}
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Increased gap */}
            <FooterSection title="About LMS Platform">
                <p className="mt-2 text-base text-secondary"> {/* Increased font size */}
                    A platform offering quality educational resources to enhance learning experiences.
                </p>
            </FooterSection>

            <FooterSection title="Quick Links">
                <FooterLinks />
            </FooterSection>

            <FooterSection title="Contact Us">
                <p className="mt-2 text-base text-secondary">Email: support@lmsplatform.com</p> {/* Increased font size */}
                <p className="text-base text-secondary">Phone: +1 (555) 123-4567</p> {/* Increased font size */}
                <SocialIcons />
            </FooterSection>
        </div>

        <div className="mt-6 border-t border-secondary pt-4"> {/* Increased margin and padding */}
            <p className="text-center text-base text-secondary">
                &copy; {new Date().getFullYear()} LMS Platform. All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
