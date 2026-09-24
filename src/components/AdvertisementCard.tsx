import React from 'react';
import { ExternalLink, Sparkles, Award } from 'lucide-react';

interface AdvertisementCardProps {
  className?: string;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ className = '' }) => {
  return (
    <aside
      aria-label="Sponsored Advertisement"
      className={`relative bg-gradient-to-br from-amber-50 via-orange-50/40 to-white rounded-2xl border-2 border-dashed border-amber-300/80 p-5 shadow-sm text-slate-800 transition-all hover:shadow-md ${className}`}
    >
      {/* Clear Advertisement Label */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/60">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900">
          <Sparkles className="w-3 h-3 text-amber-700" />
          Advertisement
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Sponsored Partner</span>
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-700">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-800">
              Top MBA Colleges in India
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Featured Educational Program</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Explore MBA programs, admissions, fees, placements and program details.
        </p>

        {/* Feature highlight bullet points */}
        <div className="bg-white/80 rounded-xl p-3 border border-amber-100 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Industry-aligned dual specializations & analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Comprehensive placement and internship mentorship</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-1">
          <a
            href="https://nbs.edu.in/top-mba-colleges-in-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>Explore MBA Colleges</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Disclosure */}
        <p className="text-[10px] text-slate-400 text-center leading-tight">
          Third-party sponsored placement. Links redirect to external institution website.
        </p>
      </div>
    </aside>
  );
};
