import React from 'react';
import { Institute } from '../types/index.ts';
import { InstituteCard } from '../components/InstituteCard.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';
import { GraduationCap, Clock, Award, CheckCircle } from 'lucide-react';

import { Pagination } from '../components/Pagination.tsx';

interface CoursesPageProps {
  programSlug: string;
  institutes: Institute[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  programSlug,
  institutes,
  onNavigate,
  onOpenEnquiry
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [programSlug]);
  // Format slug to human readable
  const programMap: Record<string, { title: string; description: string; typeFilter: string }> = {
    mba: {
      title: 'Full-Time MBA Programs',
      description: 'Comprehensive 1-2 year full-time Master of Business Administration programs featuring immersive core business disciplines and internships.',
      typeFilter: 'Full-time'
    },
    'executive-mba': {
      title: 'Executive MBA (EMBA) Programs',
      description: 'Modular weekend and accelerated executive programs engineered for senior leaders, directors, and experienced managers.',
      typeFilter: 'Executive'
    },
    mim: {
      title: 'Master in Management (MiM) Programs',
      description: 'Foundational pre-experience management degrees designed for early career professionals and recent bachelor graduates.',
      typeFilter: 'MiM'
    },
    pgdm: {
      title: 'Post Graduate Diploma in Management (PGDM)',
      description: 'Rigorous industry-aligned postgraduate diplomas providing deep corporate exposure, dual specializations, and applied business analytics.',
      typeFilter: 'PGDM'
    }
  };

  const currentInfo = programMap[programSlug.toLowerCase()] || {
    title: 'Management Degree Programs',
    description: 'Explore accredited business programs designed for contemporary corporate leadership.',
    typeFilter: 'MBA'
  };

  const matchingInstitutes = institutes.filter(inst =>
    inst.programType.toLowerCase().includes(currentInfo.typeFilter.toLowerCase()) ||
    inst.courses.some(c => c.type.toLowerCase().includes(currentInfo.typeFilter.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <SeoHead
        title={`${currentInfo.title} Worldwide | Compare Business Schools`}
        description={`${currentInfo.description} Review top business schools, eligibility criteria, fees, and application processes.`}
        canonicalPath={`/courses/${programSlug}/`}
      />

      <Breadcrumbs
        items={[
          { label: 'Programs', href: '/courses/mba/' },
          { label: currentInfo.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full">
            Degree Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            {currentInfo.title}
          </h1>
          <p className="text-sm sm:text-base text-blue-200 mt-3 leading-relaxed">
            {currentInfo.description}
          </p>
        </div>
      </div>

      {/* Program Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs sm:text-sm">
        <button
          onClick={() => onNavigate('/courses/mba/')}
          className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
            programSlug === 'mba' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Full-time MBA
        </button>
        <button
          onClick={() => onNavigate('/courses/executive-mba/')}
          className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
            programSlug === 'executive-mba' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Executive MBA
        </button>
        <button
          onClick={() => onNavigate('/courses/mim/')}
          className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
            programSlug === 'mim' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Master in Management (MiM)
        </button>
        <button
          onClick={() => onNavigate('/courses/pgdm/')}
          className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
            programSlug === 'pgdm' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          PGDM Programs
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchingInstitutes
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map(inst => (
                <InstituteCard
                  key={inst.id}
                  institute={inst}
                  onViewDetails={slug => onNavigate(`/college/${slug}/`)}
                  onEnquireNow={(col, crs) => onOpenEnquiry(col, crs)}
                />
              ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(matchingInstitutes.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            totalItems={matchingInstitutes.length}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AdvertisementCard />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm">Need Program Guidance?</h4>
            <p className="leading-relaxed">
              Connect with education advisors to compare program accreditation, faculty research, and international career paths.
            </p>
            <button
              onClick={() => onOpenEnquiry(undefined, currentInfo.title)}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Request Free Advisory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
