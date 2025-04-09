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

export default function Home() {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [language, setLanguage] = useState('EN');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);

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
            link: "/digital-security-risks"
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
                    <nav className="flex justify-center space-x-8 text-sm pb-5">
                        <Link href="/" className="nav-link px-2 py-1 border-b-2 border-black">
                            HOME
                        </Link>
                        <Link href="/check-email-security" className="nav-link px-2 py-1 border-b-2 border-transparent hover:border-black transition-colors duration-300">
                            SCAN EMAIL
                        </Link>
                        <Link href="/phishing-detection" className="nav-link px-2 py-1 border-b-2 border-transparent hover:border-black transition-colors duration-300">
                            DETECT PHISHING
                        </Link>
                        <Link href="/digital-security-risks" className="nav-link px-2 py-1 border-b-2 border-transparent hover:border-black transition-colors duration-300">
                            LEARN SECURITY
                        </Link>
                        <Link href="/security-quiz" className="nav-link px-2 py-1 border-b-2 border-transparent hover:border-black transition-colors duration-300">
                            TAKE A QUIZ
                        </Link>
                    </nav>
                </div>
            </header>

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
