import React from 'react';
import { Filter, RotateCcw, Compass, Award, BookOpen, Search } from 'lucide-react';
import { COUNTRIES, SPECIALIZATIONS, PROGRAM_TYPES } from '../data/institutesData.ts';

interface FilterSidebarProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  selectedProgramType: string;
  onProgramTypeChange: (programType: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCountry,
  onCountryChange,
  selectedSpecialization,
  onSpecializationChange,
  selectedProgramType,
  onProgramTypeChange,
  searchQuery,
  onSearchQueryChange,
  onReset,
  totalResults
}) => {
  const isFiltered =
    selectedCountry !== 'All Countries' ||
    selectedSpecialization !== 'All Specializations' ||
    selectedProgramType !== 'All Program Types' ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {totalResults}
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold focus:outline-none"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Search Directory
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchQueryChange(e.target.value)}
            placeholder="Institute or keyword..."
            className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          Country / Region
        </label>
        <select
          value={selectedCountry}
          onChange={e => onCountryChange(e.target.value)}
          className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        >
          {COUNTRIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Specialization Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          MBA Specialization
        </label>
        <select
          value={selectedSpecialization}
          onChange={e => onSpecializationChange(e.target.value)}
          className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        >
          {SPECIALIZATIONS.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Program Type Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          Program Type
        </label>
        <div className="space-y-1.5">
          {PROGRAM_TYPES.map(pt => (
            <label
              key={pt}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedProgramType === pt
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="programType"
                value={pt}
                checked={selectedProgramType === pt}
                onChange={() => onProgramTypeChange(pt)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{pt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
