"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SimpleCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  linkHref: string;
  bgColor?: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  title,
  description,
  imageSrc,
  linkHref,
  bgColor = '#eef9ff'
}) => {
  return (
    <Link href={linkHref}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className={`h-48 ${bgColor} flex items-center justify-center p-4`}>
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt={title}
              width={200} 
              height={150}
              className="h-full w-auto object-contain"
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-[#374b54]">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard; 