"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaShieldAlt, FaBook, FaClipboardCheck, FaGlobe, FaChevronDown } from 'react-icons/fa';

// Define a Morandi blue-gray color palette (from lightest to darkest)
const teaColors = {
    lightest: "#e3edf3", // The lightest blue-gray color
    light: "#d3e1ea",    // The light blue-gray color
    mild: "#c0d2de",     // The mild blue-gray color
    medium: "#b2c6d4",   // The medium blue-gray color
    text: "#374b54",     // The blue-gray text color
    hover: "#97afc1"     // The hover blue-gray color
};

// Define navigation items with submenus
const navItems = [
    {
        label: 'HOME',
        href: '/',
        submenu: [
            { label: 'Main Page', href: '/', description: 'Return to our main homepage' },
            { label: 'About Us', href: '/about', description: 'Learn more about our mission' }
        ]
    },
    {
        label: 'SCAN EMAIL',
        href: '/check-email-security',
        submenu: [
            { label: 'Check Email Security', href: '/check-email-security', description: 'Verify if your email has been breached' },
            { label: 'Email Security Tips', href: '/email-security-tips', description: 'Best practices for email security' }
        ]
    },
    {
        label: 'DETECT PHISHING',
        href: '/phishing-detection',
        submenu: [
            { label: 'Phishing Detection', href: '/phishing-detection', description: 'Tools to identify phishing attempts' },
            { label: 'Recent Phishing Scams', href: '/recent-scams', description: 'Latest phishing techniques to watch for' }
        ]
    },
    {
        label: 'LEARN SECURITY',
        href: '/learn-security',
        submenu: [
            { label: 'Digital Security Risks', href: '/learn-security', description: 'Common risks in digital environment' },
            { label: 'Security Guides', href: '/security-guides', description: 'Comprehensive security tutorials' },
            { label: 'Best Practices', href: '/security-best-practices', description: 'Recommended security measures' }
        ]
    },
    {
        label: 'TAKE A QUIZ',
        href: '/security-quiz',
        submenu: [
            { label: 'Security Knowledge Quiz', href: '/security-quiz', description: 'Test your security knowledge' },
            { label: 'Phishing Awareness Quiz', href: '/phishing-quiz', description: 'Test your ability to spot phishing' }
        ]
    },
];

export default function Home() {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [language, setLanguage] = useState('EN');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
    const menuItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [menuPositions, setMenuPositions] = useState<{ [key: string]: number }>({});
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // The language switch function
    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        setShowLanguageDropdown(false);
    };

    // The function to close the dropdown menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setShowLanguageDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [langDropdownRef]);

    // Calculate the position of each menu item
    useEffect(() => {
        const positions: { [key: string]: number } = {};
        Object.keys(menuItemRefs.current).forEach(key => {
            const el = menuItemRefs.current[key];
            if (el) {
                // Calculate the center position of the element
                const rect = el.getBoundingClientRect();
                positions[key] = rect.left + rect.width / 2;
            }
        });
        setMenuPositions(positions);
    }, [hoveredNavItem]);

    // Handle mouse entering the menu item
    const handleMenuItemEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }
        setHoveredNavItem(label);
    };

    // Handle mouse leaving the menu item
    const handleMenuItemLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            const dropdown = document.getElementById(`dropdown-${hoveredNavItem}`);
            if (!dropdown || !dropdown.matches(':hover')) {
                setHoveredNavItem(null);
            }
        }, 300);
    };

    // Define the data for the four main functional blocks
    const sections = [
        {
            id: "scan-email",
            title: "Scan Email",
            description: "Check if your email has been compromised in any data breaches and learn how to secure your accounts.",
            icon: <FaEnvelope size={48} />,
            color: teaColors.lightest,
            hoverColor: teaColors.hover,
            link: "/check-email-security"
        },
        {
            id: "detect-phishing",
            title: "Detect Phishing",
            description: "Learn how to identify and avoid phishing attempts to protect your personal information.",
            icon: <FaShieldAlt size={48} />,
            color: teaColors.light,
            hoverColor: teaColors.hover,
            link: "/phishing-detection"
        },
        {
            id: "learn-security",
            title: "Learn Security",
            description: "Discover essential digital security practices to safeguard your online presence and data.",
            icon: <FaBook size={48} />,
            color: teaColors.mild,
            hoverColor: teaColors.hover,
            link: "/learn-security"
        },
        {
            id: "take-quiz",
            title: "Take a Quiz",
            description: "Test your digital citizenship knowledge and improve your security awareness.",
            icon: <FaClipboardCheck size={48} />,
            color: teaColors.medium,
            hoverColor: teaColors.hover,
            link: "/security-quiz"
        }
    ];

    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* The top area - only contains the brand title and navigation bar */}
            <header className="border-b border-gray-100 pt-8">
                {/* The left Logo - placed on the left of the main functional block */}
                <div className="absolute left-0 top-0 -ml-16">
                    <Image
                        src="/caknak-logo.png"
                        alt="caKnak Logo"
                        width={70}
                        height={70}
                    />
                </div>

                {/* The right language switch dropdown menu - placed on the right of the main functional block */}
                <div className="absolute right-20 top-3 -mr-16" ref={langDropdownRef}>
                    <button
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        className="flex items-center text-sm px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                        <FaGlobe className="mr-2" />
                        <span>{language}</span>
                        <FaChevronDown className="ml-2" size={12} />
                    </button>

                    {/* The language dropdown menu */}
                    {showLanguageDropdown && (
                        <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => changeLanguage('EN')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                            >
                                English
                            </button>
                            <button
                                onClick={() => changeLanguage('ZH')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                            >
                                中文
                            </button>
                        </div>
                    )}
                </div>
                {/* The middle brand title - moved up */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold tracking-wide">caKnak</h1>
                </div>

                {/* The navigation menu - increased distance from the brand title */}
                <div className="container mx-auto px-6">
                    <nav className="flex justify-center space-x-8 text-ms pb-5">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                ref={(el) => {
                                    menuItemRefs.current[item.label] = el;
                                }}
                                onMouseEnter={() => handleMenuItemEnter(item.label)}
                                onMouseLeave={handleMenuItemLeave}
                            >
                                <Link
                                    href={item.href}
                                    className={`px-2 py-1 border-b-2 ${item.href === '/' ? 'border-black' : 'border-transparent hover:border-[#97afc1]'
                                        } transition-colors duration-300`}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </header>

            {/* The dropdown menu content area */}
            {hoveredNavItem && (
                <>
                    <div
                        id={`dropdown-${hoveredNavItem}`}
                        className="fixed top-[150px] left-0 w-full bg-white border-t border-gray-200 shadow-md z-40"
                        onMouseEnter={() => setHoveredNavItem(hoveredNavItem)}
                        onMouseLeave={() => setHoveredNavItem(null)}
                    >
                        <div className="container mx-auto">
                            {/* Create a content area for each menu item, only show when it is hovered */}
                            {navItems.map((navItem) => (
                                <div
                                    key={navItem.label}
                                    className={`${navItem.label === hoveredNavItem ? 'block' : 'hidden'}`}
                                    style={{
                                        position: 'relative',
                                        left: menuPositions[navItem.label] ? `calc(${menuPositions[navItem.label]}px - 50%)` : '0',
                                        maxWidth: '320px',
                                        margin: '0 auto'
                                    }}
                                >
                                    <div className="py-3">
                                        {navItem.submenu?.map((subItem, idx) => (
                                            <Link key={idx} href={subItem.href} className="block">
                                                <div className="px-4 py-2 hover:bg-gray-50">
                                                    <h3 className="font-medium text-[#374b54]">{subItem.label}</h3>
                                                    {subItem.description && (
                                                        <p className="text-sm text-gray-500">{subItem.description}</p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* The background blur mask - cover on the main content */}
                    <div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 pointer-events-none"
                        style={{ top: '150px' }}
                    ></div>
                </>
            )}

            {/* The main functional block section - with the left Logo and the right language switch */}
            <section className="flex-grow px-6 pt-10 pb-10">
                <div className="container mx-auto relative">

                    {/* The four functional blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                className="relative rounded-lg overflow-hidden cursor-pointer h-56 md:h-64"
                                style={{ backgroundColor: section.color }}
                                whileHover={{
                                    scale: 1.03,
                                    backgroundColor: section.hoverColor,
                                    transition: { duration: 0.3 }
                                }}
                                onHoverStart={() => setHoveredSection(section.id)}
                                onHoverEnd={() => setHoveredSection(null)}
                                onClick={() => window.location.href = section.link}
                            >
                                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                                    <div className="mb-4 text-[#374b54]">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-2xl font-medium mb-2 text-[#374b54]">{section.title}</h3>

                                    {/* Only show the description when hovering - with a blooming animation effect */}
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: hoveredSection === section.id ? 1 : 0,
                                            height: hoveredSection === section.id ? 'auto' : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="text-base text-[#374b54] max-w-xs"
                                    >
                                        {section.description}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The website footer */}
            <footer className="py-8 bg-[#F9F9F9] text-center text-xs text-gray-500">
                <div className="container mx-auto">
                    <p className="mb-2">© 2025 caKnak. All rights reserved.</p>
                    <p>Your trusted resource for digital safety, security, and citizenship education.</p>
                </div>
            </footer>
        </main>
    );
}