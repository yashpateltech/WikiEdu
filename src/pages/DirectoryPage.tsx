import React, { useState, useMemo } from 'react';
import { Institute } from '../types/index.ts';
import { InstituteCard } from '../components/InstituteCard.tsx';
import { FilterSidebar } from '../components/FilterSidebar.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';
import { COUNTRIES } from '../data/institutesData.ts';

interface DirectoryPageProps {
  institutes: Institute[];
  currentCountry?: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  institutes,
  currentCountry,
  onNavigate,
  onOpenEnquiry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(
    currentCountry ? currentCountry.charAt(0).toUpperCase() + currentCountry.slice(1) : 'All Countries'
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedProgramType, setSelectedProgramType] = useState('All Program Types');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered institutes
  const filteredInstitutes = useMemo(() => {
    return institutes.filter(inst => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          inst.name.toLowerCase().includes(q) ||
          inst.city.toLowerCase().includes(q) ||
          inst.country.toLowerCase().includes(q) ||
          inst.specializations.some(s => s.toLowerCase().includes(q)) ||
          inst.courses.some(c => c.name.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Country filter
      if (selectedCountry !== 'All Countries') {
        if (
          inst.country.toLowerCase() !== selectedCountry.toLowerCase() &&
          inst.countrySlug.toLowerCase() !== selectedCountry.toLowerCase()
        ) {
          return false;
        }
      }

      // Specialization filter
      if (selectedSpecialization !== 'All Specializations') {
        if (!inst.specializations.some(s => s.toLowerCase() === selectedSpecialization.toLowerCase())) {
          return false;
        }
      }

      // Program Type filter
      if (selectedProgramType !== 'All Program Types') {
        const matchesType =
          inst.programType.toLowerCase().includes(selectedProgramType.toLowerCase()) ||
          inst.courses.some(c => c.type.toLowerCase().includes(selectedProgramType.toLowerCase()));
        if (!matchesType) return false;
      }

      return true;
    });
  }, [institutes, searchQuery, selectedCountry, selectedSpecialization, selectedProgramType]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredInstitutes.length / itemsPerPage);
  const paginatedInstitutes = filteredInstitutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    if (country === 'All Countries') {
      onNavigate('/mba-colleges/');
    } else {
      const slug = country.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      onNavigate(`/mba-colleges/${slug}/`);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCountry('All Countries');
    setSelectedSpecialization('All Specializations');
    setSelectedProgramType('All Program Types');
    setCurrentPage(1);
    onNavigate('/mba-colleges/');
  };

  const pageTitle =
    selectedCountry !== 'All Countries'
      ? `Top MBA Colleges & Business Schools in ${selectedCountry} | Global MBA Directory`
      : 'Explore MBA Colleges & Business Schools Worldwide | Directory';

  const pageDescription =
    selectedCountry !== 'All Countries'
      ? `Compare top MBA and management programs in ${selectedCountry}. Review fees, eligibility, course duration, and request official program brochures.`
      : 'Browse accredited MBA, Executive MBA, MiM, and PGDM programs from leading business schools worldwide. Filter by country, specialization, and fees.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={
          selectedCountry !== 'All Countries'
            ? `/mba-colleges/${selectedCountry.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`
            : '/mba-colleges/'
        }
      />

      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: 'Colleges', href: '/mba-colleges/' },
          ...(selectedCountry !== 'All Countries' ? [{ label: selectedCountry }] : [])
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {selectedCountry !== 'All Countries'
            ? `MBA Colleges & Business Schools in ${selectedCountry}`
            : 'Explore MBA Colleges & Business Schools Worldwide'}
        </h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-3xl leading-relaxed">
          Discover accredited institutions, compare curricula, analyze tuition fee structures, and submit direct admission enquiries.
        </p>
      </div>

      {/* Main Grid: Filters Sidebar + Listings + Mobile Ad */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <FilterSidebar
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            selectedSpecialization={selectedSpecialization}
            onSpecializationChange={s => {
              setSelectedSpecialization(s);
              setCurrentPage(1);
            }}
            selectedProgramType={selectedProgramType}
            onProgramTypeChange={pt => {
              setSelectedProgramType(pt);
              setCurrentPage(1);
            }}
            searchQuery={searchQuery}
            onSearchQueryChange={q => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            onReset={handleReset}
            totalResults={filteredInstitutes.length}
          />

          {/* Sidebar Advertisement on directory */}
          <div className="hidden lg:block">
            <AdvertisementCard />
          </div>
        </div>

        {/* Right Column: Cards Grid & Pagination */}
        <div className="lg:col-span-3 space-y-6">
          {filteredInstitutes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                🔍
              </div>
              <h3 className="font-bold text-slate-800 text-lg">No institutes match your criteria</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try clearing active filters or searching for another country or specialization.
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedInstitutes.map(inst => (
                  <InstituteCard
                    key={inst.id}
                    institute={inst}
                    onViewDetails={slug => onNavigate(`/college/${slug}/`)}
                    onEnquireNow={(col, crs) => onOpenEnquiry(col, crs)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                totalItems={filteredInstitutes.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}

          {/* Mobile Ad card at bottom of directory */}
          <div className="block lg:hidden pt-4">
            <AdvertisementCard />
          </div>
        </div>
      </div>
    </div>
  );
};
