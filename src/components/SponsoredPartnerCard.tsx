import React from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Award,
  ExternalLink,
  Send,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { CollegeLogo } from './CollegeLogo.tsx';

interface SponsoredPartnerCardProps {
  onEnquireNow?: (instituteName: string, courseName?: string) => void;
  onViewDetails?: (slug: string) => void;
}

export const SponsoredPartnerCard: React.FC<SponsoredPartnerCardProps> = ({
  onEnquireNow,
  onViewDetails
}) => {
  return (
    <div className="bg-gradient-to-b from-amber-50/40 via-white to-blue-50/30 rounded-2xl border-2 border-amber-400/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative">
      {/* Top Banner with Badges */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80"
          alt="Narayana Business School Campus"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

        {/* Sponsored Partner Ribbon */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
          <span>Sponsored Partner</span>
        </div>

        {/* Ad Transparency Tag */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
          Ad • Verified
        </div>

        {/* Location & Accreditation */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Ahmedabad, India 🇮🇳</span>
        </div>

        {/* Official Website Logo Avatar floating */}
        <div className="absolute -bottom-4 left-4 z-10 shadow-md rounded-xl">
          <CollegeLogo
            name="Narayana Business School"
            websiteUrl="https://nbs.edu.in"
            logoUrl="https://www.google.com/s2/favicons?domain=nbs.edu.in&sz=128"
            size="lg"
            rounded="rounded-xl"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 pt-7 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-md flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-700" />
              <span>Top MBA Colleges in India</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>AACSB Member</span>
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            Narayana Business School (NBS)
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            Explore MBA programs, admissions, fees, placements and program details. Premier management education with 100% placement track record and global immersion.
          </p>

          {/* Quick Metrics / Highlights */}
          <div className="grid grid-cols-2 gap-2 my-3 py-2.5 px-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate font-medium">2 Years (Full-Time)</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate font-bold text-slate-900">INR 8.4L – 10.85L</span>
            </div>
          </div>

          {/* Specializations & Features */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
            <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
              MBA + PGPCE
            </span>
            <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
              PGDM Dual Spec
            </span>
            <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
              Finance & Analytics
            </span>
            <span className="font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Highest CTC 32 LPA
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-amber-100 flex flex-col sm:flex-row items-center gap-2">
          {/* Primary External Ad CTA */}
          <a
            href="https://nbs.edu.in/top-mba-colleges-in-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Explore MBA Colleges</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </a>

          {/* Enquire Now Button */}
          {onEnquireNow && (
            <button
              type="button"
              onClick={() => onEnquireNow('Narayana Business School', 'MBA + PGPCE')}
              className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Enquire Now</span>
            </button>
          )}

          {/* View Details */}
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails('narayana-business-school')}
              className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
