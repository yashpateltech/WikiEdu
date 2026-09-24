import React from 'react';
import { Institute } from '../types/index.ts';
import { InstituteCard } from '../components/InstituteCard.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';
import { Award, CheckCircle } from 'lucide-react';
import { SPECIALIZATIONS } from '../data/institutesData.ts';

interface SpecializationsPageProps {
  specializationSlug: string;
  institutes: Institute[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const SpecializationsPage: React.FC<SpecializationsPageProps> = ({
  specializationSlug,
  institutes,
  onNavigate,
  onOpenEnquiry
}) => {
  // Convert slug to clean title
  const cleanTitle = specializationSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const matchingInstitutes = institutes.filter(inst =>
    inst.specializations.some(s => s.toLowerCase().includes(specializationSlug.replace('-', ' '))) ||
    inst.courses.some(c =>
      c.specializations.some(cs => cs.toLowerCase().includes(specializationSlug.replace('-', ' ')))
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <SeoHead
        title={`Top MBA Programs in ${cleanTitle} | Global MBA Directory`}
        description={`Discover business schools offering MBA specializations in ${cleanTitle}. Compare fees, curriculum, duration, and submit admission enquiries.`}
        canonicalPath={`/specializations/${specializationSlug}/`}
      />

      <Breadcrumbs
        items={[
          { label: 'Specializations', href: '/specializations/finance/' },
          { label: cleanTitle }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full">
            Specialization Focus
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            MBA in {cleanTitle}
          </h1>
          <p className="text-sm sm:text-base text-blue-200 mt-3 leading-relaxed">
            Explore premier business schools around the world with specialized curricula, corporate internships, and faculty research in {cleanTitle}.
          </p>
        </div>
      </div>

      {/* Specialization Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {SPECIALIZATIONS.filter(s => s !== 'All Specializations').map(spec => {
          const sSlug = spec.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <button
              key={spec}
              onClick={() => onNavigate(`/specializations/${sSlug}/`)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                specializationSlug.toLowerCase() === sSlug
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {matchingInstitutes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              No programs found matching this specialization currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchingInstitutes.map(inst => (
                <InstituteCard
                  key={inst.id}
                  institute={inst}
                  onViewDetails={slug => onNavigate(`/college/${slug}/`)}
                  onEnquireNow={(col, crs) => onOpenEnquiry(col, crs)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AdvertisementCard />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm">Specialization Advisory</h4>
            <p className="leading-relaxed">
              Unsure if {cleanTitle} fits your career goals? Request tailored feedback from our admissions team.
            </p>
            <button
              onClick={() => onOpenEnquiry(undefined, `MBA in ${cleanTitle}`)}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Consult Admissions Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
