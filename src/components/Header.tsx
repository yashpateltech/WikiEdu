import React, { useState } from 'react';
import {
  GraduationCap,
  Globe,
  Menu,
  X,
  Send,
  Search,
  BookOpen,
  Layers,
  FileText,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  Global<span className="text-blue-600">MBA</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-sm ml-1 hidden sm:inline-block">
                    Directory
                  </span>
                </span>
                <span className="block text-[10px] font-medium text-slate-400 tracking-wide uppercase -mt-0.5">
                  Worldwide Management Education
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPath === '/' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Colleges Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleNav('/mba-colleges/')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/mba-colleges') ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Colleges</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 text-xs space-y-1">
                  <div className="px-3 py-1.5 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                    Popular Destinations
                  </div>
                  <button
                    onClick={() => handleNav('/mba-colleges/india/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium flex items-center justify-between"
                  >
                    <span>MBA in India</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Featured</span>
                  </button>
                  <button
                    onClick={() => handleNav('/mba-colleges/usa/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in United States
                  </button>
                  <button
                    onClick={() => handleNav('/mba-colleges/uk/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in United Kingdom
                  </button>
                  <button
                    onClick={() => handleNav('/mba-colleges/france/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in France
                  </button>
                  <button
                    onClick={() => handleNav('/mba-colleges/singapore/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in Singapore
                  </button>
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => handleNav('/mba-colleges/')}
                      className="w-full text-left px-3 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50"
                    >
                      View All 16+ Countries →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Programs Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleNav('/courses/mba/')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/courses') ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Programs</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-60 pt-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 text-xs space-y-1">
                  <button
                    onClick={() => handleNav('/courses/mba/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Full-time MBA Programs
                  </button>
                  <button
                    onClick={() => handleNav('/courses/executive-mba/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Executive MBA (EMBA)
                  </button>
                  <button
                    onClick={() => handleNav('/courses/mim/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Master in Management (MiM)
                  </button>
                  <button
                    onClick={() => handleNav('/courses/pgdm/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Post Graduate Diploma (PGDM)
                  </button>
                </div>
              </div>
            </div>

            {/* Specializations Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleNav('/specializations/finance/')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/specializations') ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Specializations</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 text-xs space-y-1">
                  <button
                    onClick={() => handleNav('/specializations/finance/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in Finance
                  </button>
                  <button
                    onClick={() => handleNav('/specializations/marketing/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in Marketing
                  </button>
                  <button
                    onClick={() => handleNav('/specializations/business-analytics/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    MBA in Business Analytics
                  </button>
                  <button
                    onClick={() => handleNav('/specializations/strategy-leadership/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Strategy & Leadership
                  </button>
                  <button
                    onClick={() => handleNav('/specializations/supply-chain/')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-medium"
                  >
                    Supply Chain Management
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNav('/blog/')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/blog') ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Articles
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg sm:hidden flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Enquire</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/mba-colleges/')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Explore All Colleges</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">16+ Countries</span>
            </button>

            <div className="pl-3 py-1 space-y-1 border-l-2 border-slate-100 ml-2">
              <button
                onClick={() => handleNav('/mba-colleges/india/')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                🇮🇳 MBA in India (Featured)
              </button>
              <button
                onClick={() => handleNav('/mba-colleges/usa/')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                🇺🇸 MBA in USA
              </button>
              <button
                onClick={() => handleNav('/mba-colleges/uk/')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                🇬🇧 MBA in UK
              </button>
              <button
                onClick={() => handleNav('/mba-colleges/france/')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                🇫🇷 MBA in France
              </button>
              <button
                onClick={() => handleNav('/mba-colleges/singapore/')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                🇸🇬 MBA in Singapore
              </button>
            </div>

            <button
              onClick={() => handleNav('/courses/mba/')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Programs (MBA, EMBA, MiM, PGDM)
            </button>

            <button
              onClick={() => handleNav('/specializations/finance/')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              MBA Specializations
            </button>

            <button
              onClick={() => handleNav('/blog/')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Admission Articles & Guides
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Request Information</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
