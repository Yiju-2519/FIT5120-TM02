import React from 'react';
import Link from 'next/link';

interface FooterProps {
  brandName?: string;
  copyrightYear?: number;
  links?: {
    title: string;
    href: string;
  }[];
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'caKnak',
  copyrightYear = new Date().getFullYear(),
  links = [
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms of Service', href: '/terms-of-service' },
    { title: 'Contact Us', href: '/contact' }
  ]
}) => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {copyrightYear} {brandName}. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 