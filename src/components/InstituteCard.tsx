import React from 'react';
import { MapPin, Clock, DollarSign, Award, ExternalLink, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { Institute } from '../types/index.ts';
import { CollegeLogo } from './CollegeLogo.tsx';

interface InstituteCardProps {
  institute: Institute;
  onViewDetails: (slug: string) => void;
  onEnquireNow: (instituteName: string, courseName?: string) => void;
}

export const InstituteCard: React.FC<InstituteCardProps> = ({
  institute,
  onViewDetails,
  onEnquireNow
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-blue-300">
      {/* Top Banner Image with Badges */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={institute.coverImage}
          alt={`${institute.name} campus architecture`}
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Featured Badge */}
        {institute.featured && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>Featured School</span>
          </div>
        )}

        {/* Location Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{institute.city}, {institute.country}</span>
        </div>

        {/* Official Website Logo Avatar floating */}
        <div className="absolute -bottom-4 left-4 z-10 shadow-md rounded-xl">
          <CollegeLogo
            name={institute.name}
            websiteUrl={institute.officialWebsite}
            logoUrl={institute.logo}
            size="lg"
            rounded="rounded-xl"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 pt-7 flex-1 flex flex-col">
        {/* Title and Program Type */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              {institute.programType}
            </span>
            <span className="text-[11px] text-slate-400">Est. {institute.establishedYear}</span>
          </div>
          <h3
            onClick={() => onViewDetails(institute.slug)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
          >
            {institute.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {institute.description}
          </p>
        </div>

        {/* Program Highlights: Duration, Fees, Eligibility */}
        <div className="grid grid-cols-2 gap-2 my-3 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate font-medium">{institute.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate font-semibold text-slate-900">{institute.tuitionFee}</span>
          </div>
        </div>

        {/* Specializations Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-1 flex-wrap">
            {institute.specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {spec}
              </span>
            ))}
            {institute.specializations.length > 3 && (
              <span className="text-[11px] text-slate-400 font-medium px-1">
                +{institute.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Website, View Details, Enquire Now */}
        <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
          {/* Website Button */}
          <a
            href={institute.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            title="Visit Official Institute Website"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(institute.slug)}
            className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Enquire Now Button */}
          <button
            onClick={() => onEnquireNow(institute.name, institute.courses[0]?.name || institute.programType)}
            className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
