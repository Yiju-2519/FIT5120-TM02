import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

// 莫兰迪蓝灰色系 - 与主页保持一致
const morandiColors = {
  lightest: "#e3edf3", // 最浅蓝灰色
  light: "#d3e1ea",    // 浅蓝灰色
  mild: "#c0d2de",     // 中蓝灰色
  medium: "#b2c6d4",   // 深蓝灰色
  text: "#374b54",     // 文本蓝灰色
  hover: "#97afc1"     // 悬停蓝灰色
};

// 定义导航项类型
export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

// NavBar组件属性
interface NavBarProps {
  navItems?: NavItem[];
  logo?: string;
  logoAlt?: string;
  showTitle?: boolean;
}

// 默认导航项 - 更新为主页上的导航项
const defaultNavItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'SCAN EMAIL', href: '/check-email-security' },
  { label: 'DETECT PHISHING', href: '/phishing-detection' },
  { label: 'LEARN SECURITY', href: '/digital-security-risks' },
  { label: 'TAKE A QUIZ', href: '/security-quiz' },
];

export const NavBar: React.FC<NavBarProps> = ({
  navItems = defaultNavItems,
  logo = '/caknak-logo.png',
  logoAlt = 'caKnak Logo',
  showTitle = false,
}) => {
  const pathname = usePathname();
  const [language, setLanguage] = useState('EN');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // 语言切换函数
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // 点击外部关闭下拉菜单
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

  // 检查当前路径是否匹配导航项
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-gray-100 fixed w-full bg-white z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center py-2">
          {/* caKnak标题文字 */}
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center">
              <span className="text-4xl font-bold text-[#374b54]">caKnak</span>
            </div>
            
            {/* 语言切换下拉菜单 */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center text-sm px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <FaGlobe className="mr-2" /> 
                <span>{language}</span>
                <FaChevronDown className="ml-2" size={12} />
              </button>
              
              {/* 语言下拉菜单 */}
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
          
          {/* 导航菜单居中 */}
          <nav className="hidden md:flex space-x-6 items-center mt-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                  isActive(item.href)
                    ? 'border-[#374b54] text-[#374b54] font-semibold'
                    : 'border-transparent hover:border-[#97afc1] text-[#374b54]'
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