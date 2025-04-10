import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

// Define a Morandi blue-gray color palette (from lightest to darkest)
const morandiColors = {
  lightest: "#e3edf3", // The lightest blue-gray color
  light: "#d3e1ea",    // The light blue-gray color
  mild: "#c0d2de",     // The mild blue-gray color
  medium: "#b2c6d4",   // The medium blue-gray color
  text: "#374b54",     // The blue-gray text color
  hover: "#97afc1"     // The hover blue-gray color
};

// Define the type for navigation items
export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  submenu?: { 
    label: string; 
    href: string; 
    description?: string;
  }[];
};

// NavBar component properties
interface NavBarProps {
  navItems?: NavItem[];
  logo?: string;
  logoAlt?: string;
  showTitle?: boolean;
}

// Default navigation items
const defaultNavItems: NavItem[] = [
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

export const NavBar: React.FC<NavBarProps> = ({
  navItems = defaultNavItems,
  logo = '/caknak-logo.png',
  logoAlt = 'caKnak Logo',
  showTitle = true,
}) => {
  const pathname = usePathname();
  const [language, setLanguage] = useState('EN');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [menuPositions, setMenuPositions] = useState<{ [key: string]: number }>({});
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Language switch function
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // Click outside to close the dropdown menu
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
  }, [hoveredItem]);

  // Check if the current path matches the navigation item
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Handle mouse entering the menu item
  const handleMenuItemEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoveredItem(label);
  };

  // Handle mouse leaving the menu item
  const handleMenuItemLeave = () => {
    // Delay closing the dropdown menu to allow the user to move to the dropdown menu
    dropdownTimeoutRef.current = setTimeout(() => {
      const dropdown = document.getElementById(`dropdown-${hoveredItem}`);
      if (!dropdown || !dropdown.matches(':hover')) {
        setHoveredItem(null);
      }
    }, 100);
  };

  return (
    <>
      {/* Fixed navigation bar */}
      <header className="border-b border-gray-100 fixed w-full bg-white z-50 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center py-2">
            {/* Top navigation bar - title and language selection */}
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <span className="text-4xl font-bold text-[#374b54]">caKnak</span>
                </Link>
              </div>
              
              {/* Language switch dropdown menu */}
              <div className="relative" ref={langDropdownRef}>
                <button 
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center text-sm px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <FaGlobe className="mr-2" /> 
                  <span>{language}</span>
                  <FaChevronDown className="ml-2" size={12} />
                </button>
                
                {/* Language dropdown menu */}
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button 
                      onClick={() => changeLanguage('EN')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      English
                    </button>
                    <button 
                      onClick={() => changeLanguage('ZH')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      中文
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main navigation menu */}
            <nav className="hidden md:flex py-2 space-x-6 items-center mt-1">
              <div className="flex items-center">
                {navItems.map((item, index) => (
                  <div 
                    key={index}
                    className="relative mx-3"
                    ref={(el) => {
                      menuItemRefs.current[item.label] = el;
                    }}
                    onMouseEnter={() => handleMenuItemEnter(item.label)}
                    onMouseLeave={handleMenuItemLeave}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link px-3 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                        isActive(item.href) ? 'border-[#374b54] text-[#374b54] font-semibold'
                        : 'border-transparent hover:border-[#97afc1] text-[#374b54]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Dropdown menu content area */}
      {hoveredItem && (
        <>
          <div 
            id={`dropdown-${hoveredItem}`}
            className="fixed top-[100px] left-0 w-full bg-white border-t border-gray-200 shadow-md z-40"
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="container mx-auto">
              {/* Create a content area for each menu item, only show when it is hovered */}
              {navItems.map((navItem) => (
                <div 
                  key={navItem.label} 
                  className={`${navItem.label === hoveredItem ? 'block' : 'hidden'}`}
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
          
          {/* Background blur mask - cover on the main content */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 pointer-events-none"
            style={{ top: '67px' }}
          ></div>
        </>
      )}

      {/* Reserve space for the navigation bar */}
      <div className="h-[72px]"></div>
    </>
  );
};

export default NavBar; 