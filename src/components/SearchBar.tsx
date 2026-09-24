import React, { useState } from 'react';
import { Search, MapPin, Compass, Award, Building, ArrowRight } from 'lucide-react';
import { COUNTRIES, SPECIALIZATIONS } from '../data/institutesData.ts';

interface SearchBarProps {
  onSearch: (params: {
    query: string;
    country: string;
    city: string;
    specialization: string;
  }) => void;
  onExploreColleges: () => void;
  initialQuery?: string;
  initialCountry?: string;
  initialCity?: string;
  initialSpecialization?: string;
  variant?: 'hero' | 'compact';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onExploreColleges,
  initialQuery = '',
  initialCountry = 'All Countries',
  initialCity = '',
  initialSpecialization = 'All Specializations',
  variant = 'hero'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [specialization, setSpecialization] = useState(initialSpecialization);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, country, city, specialization });
  };

  return (
    <div className={`w-full ${variant === 'hero' ? 'max-w-5xl mx-auto' : 'max-w-4xl'}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl shadow-xl shadow-blue-950/10 border border-slate-200/80 p-3 sm:p-4 text-slate-800 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. College / Institute Name */}
          <div className="relative flex items-center bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Building className="w-4 h-4 text-blue-600 mr-2.5 flex-shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Institute / College
              </label>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g. Narayana, Cambridge..."
                className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent border-0 p-0 focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* 2. Country */}
          <div className="relative flex items-center bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Compass className="w-4 h-4 text-blue-600 mr-2.5 flex-shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Country
              </label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent border-0 p-0 focus:outline-none cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. City */}
          <div className="relative flex items-center bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <MapPin className="w-4 h-4 text-blue-600 mr-2.5 flex-shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Ahmedabad, Paris, London..."
                className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent border-0 p-0 focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* 4. Specialization */}
          <div className="relative flex items-center bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Award className="w-4 h-4 text-blue-600 mr-2.5 flex-shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Specialization
              </label>
              <select
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent border-0 p-0 focus:outline-none cursor-pointer"
              >
                {SPECIALIZATIONS.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Buttons: Search Programs and Explore Colleges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-2">
            <span className="font-semibold text-slate-700">Popular:</span>
            <button
              type="button"
              onClick={() => {
                setCountry('India');
                onSearch({ query: '', country: 'India', city: '', specialization: 'All Specializations' });
              }}
              className="text-blue-600 hover:underline"
            >
              India (PGDM/MBA)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setSpecialization('Business Analytics');
                onSearch({ query: '', country: 'All Countries', city: '', specialization: 'Business Analytics' });
              }}
              className="text-blue-600 hover:underline"
            >
              Business Analytics
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCountry('USA');
                onSearch({ query: '', country: 'USA', city: '', specialization: 'All Specializations' });
              }}
              className="text-blue-600 hover:underline"
            >
              USA (STEM)
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreColleges}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer text-center"
            >
              Explore Colleges
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Programs</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
