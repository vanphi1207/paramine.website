import React, { useState, useEffect } from 'react';
import { Menu, X, Box } from 'lucide-react';
import { PageView } from '../types';
import { VOTE_LINK } from '../constants';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onNavigateSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onNavigateSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string, isPage: boolean) => {
    setIsOpen(false);
    if (isPage) {
      if (target === 'home') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'wiki') {
        setCurrentPage('wiki');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // It's a section on the home page
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Give time for re-render before scrolling
        setTimeout(() => onNavigateSection(target), 100);
      } else {
        onNavigateSection(target);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('home', true)}
          >
            <Box className="h-8 w-8 text-emerald-500" />
            <span className="font-bold text-2xl tracking-tighter text-white">
              PARA<span className="text-emerald-500">MINE</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <button onClick={() => handleNavClick('home', true)} className={`hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-white' : 'text-slate-300'}`}>Trang chủ</button>
              <button onClick={() => handleNavClick('features', false)} className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Tính năng</button>
              <button onClick={() => handleNavClick('staff', false)} className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Đội ngũ</button>
              <button onClick={() => handleNavClick('gallery', false)} className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Thư viện</button>
              <button onClick={() => handleNavClick('history', false)} className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Lịch sử</button>
              <a href={VOTE_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Vote</a>
              <button 
                onClick={() => handleNavClick('wiki', true)} 
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${currentPage === 'wiki' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`}
              >
                WIKI
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNavClick('home', true)} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Trang chủ</button>
            <button onClick={() => handleNavClick('features', false)} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Tính năng</button>
            <button onClick={() => handleNavClick('staff', false)} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Đội ngũ</button>
            <button onClick={() => handleNavClick('gallery', false)} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Thư viện</button>
            <button onClick={() => handleNavClick('history', false)} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Lịch sử</button>
            <a href={VOTE_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Vote</a>
            <button onClick={() => handleNavClick('wiki', true)} className="text-emerald-400 font-bold block px-3 py-2 rounded-md text-base w-full text-left">Wiki</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;