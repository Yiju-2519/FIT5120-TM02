import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// Define the possible navigation item types
export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

// NavBar component properties
interface NavBarProps {
  navItems?: NavItem[];
  logo?: string;
  logoAlt?: string;
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Data Breach', href: '/data-breach' },
  { label: 'Recovery Steps', href: '/recovery-steps' },
  { label: 'Education Center', href: '/education-center' },
  { label: 'Knowledge Quiz', href: '/knowledge-quiz' },
  { label: 'FAQ', href: '/faq' },
];

export const NavBar: React.FC<NavBarProps> = ({
  navItems = defaultNavItems,
  logo = '/caknak-logo.png',
  logoAlt = 'caKnak Logo',
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={logo}
                alt={logoAlt}
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
                unoptimized
              />
              <span className="ml-2 text-xl font-bold ">caKnak</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  item.active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 