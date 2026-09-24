import React from 'react';
import { GraduationCap, Mail, MapPin, ExternalLink, Globe2, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Global<span className="text-blue-400">MBA</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              An independent global education portal helping prospective business leaders discover, compare, and connect with accredited MBA, Executive MBA, MiM, and PGDM programs around the world.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Verified program information curated from official institutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Coverage across 16+ countries and 50+ specializations</span>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              MBA by Country
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/india/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline flex items-center gap-1.5"
                >
                  <span>MBA in India</span>
                  <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 py-0.2 rounded font-medium">Top</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/usa/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in United States
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/uk/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in United Kingdom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/france/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in France
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/singapore/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in Singapore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/canada/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in Canada
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/germany/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  MBA in Germany
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mba-colleges/')}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View All Countries →
                </button>
              </li>
            </ul>
          </div>

          {/* Programs & Specializations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Programs & Fields
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/courses/mba/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Full-time MBA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses/executive-mba/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Executive MBA (EMBA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses/mim/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Master in Management (MiM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses/pgdm/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  PGDM Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/specializations/finance/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Finance Specialization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/specializations/business-analytics/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Business Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/specializations/marketing/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Marketing Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Resources & SEO
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/blog/')}
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline"
                >
                  Education Blog & Articles
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline flex items-center gap-1"
                >
                  <span>XML Sitemap</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors text-slate-400 hover:underline flex items-center gap-1"
                >
                  <span>Robots.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://nbs.edu.in/top-mba-colleges-in-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors text-amber-400 hover:underline flex items-center gap-1 text-xs"
                >
                  <span>Partner: Top MBA India (NBS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Statement */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400 font-semibold">Independent Portal Disclaimer: </strong>
          This portal is an independent education-information directory. We do not claim affiliation, endorsement, or formal partnership with Harvard, INSEAD, Stanford, Wharton, NBS, or any listed institution unless explicitly designated. All program details, eligibility criteria, and fee structures are sourced from publicly available official institutional literature for educational decision-making. No fabricated rankings or unverified review metrics are generated.
        </div>

        {/* Copyright and Bottom Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Global MBA & Management Education Directory. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onNavigate('/')} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('/')} className="hover:text-slate-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
