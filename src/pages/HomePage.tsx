import React from 'react';
import {
  GraduationCap,
  Globe2,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  CheckCircle,
  Clock,
  Compass,
  Building,
  Users,
  Briefcase
} from 'lucide-react';
import { Institute, Article } from '../types/index.ts';
import { SearchBar } from '../components/SearchBar.tsx';
import { InstituteCard } from '../components/InstituteCard.tsx';
import { SponsoredPartnerCard } from '../components/SponsoredPartnerCard.tsx';
import { ArticleCard } from '../components/ArticleCard.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { COUNTRIES, SPECIALIZATIONS } from '../data/institutesData.ts';

interface HomePageProps {
  institutes: Institute[];
  articles: Article[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
  onSearch: (params: { query: string; country: string; city: string; specialization: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  institutes,
  articles,
  onNavigate,
  onOpenEnquiry,
  onSearch
}) => {
  const featuredInstitutes = institutes.filter(i => i.featured);
  const executivePrograms = institutes.filter(i =>
    i.programType.toLowerCase().includes('executive') ||
    i.courses.some(c => c.type === 'Executive MBA')
  );
  const recentlyAdded = [...institutes].reverse().slice(0, 4);

  const countryFlags: Record<string, string> = {
    India: '🇮🇳',
    USA: '🇺🇸',
    UK: '🇬🇧',
    France: '🇫🇷',
    Germany: '🇩🇪',
    Spain: '🇪🇸',
    Canada: '🇨🇦',
    Australia: '🇦🇺',
    Singapore: '🇸🇬',
    UAE: '🇦🇪',
    Switzerland: '🇨🇭',
    Netherlands: '🇳🇱',
    Italy: '🇮🇹',
    Ireland: '🇮🇪',
    Japan: '🇯🇵',
    'South Korea': '🇰🇷'
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SeoHead
        title="Find MBA Programs & Business Schools Worldwide | Global MBA Directory"
        description="Explore MBA, Executive MBA, MiM and management programs from business schools around the world. Compare curriculum, fees, admission requirements and eligibility."
        canonicalPath="/"
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl mx-2 sm:mx-4 px-4 sm:px-8 lg:px-12 shadow-2xl">
        {/* Background glow & subtle patterns */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs sm:text-sm font-medium border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Independent Global Management Education Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Find MBA Programs & Business Schools Worldwide
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore MBA, Executive MBA, MiM and management programs from business schools around the world.
          </p>

          {/* Hero Search Box */}
          <div className="pt-6">
            <SearchBar
              onSearch={onSearch}
              onExploreColleges={() => onNavigate('/mba-colleges/')}
              variant="hero"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-white/10">
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">16+</span>
              <span className="text-xs text-blue-200">Countries Covered</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">50+</span>
              <span className="text-xs text-blue-200">Specializations</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">100%</span>
              <span className="text-xs text-blue-200">Official Data Sources</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">Free</span>
              <span className="text-xs text-blue-200">Admissions Advisory</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Business Schools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Global Institutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Featured Business Schools
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top accredited institutions offering distinctive MBA and PGDM management programs.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/mba-colleges/')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>View All Institutes</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sponsored Partner Box placed first where all college boxes start */}
          <SponsoredPartnerCard
            onEnquireNow={(col, crs) => onOpenEnquiry(col, crs)}
            onViewDetails={slug => onNavigate(`/college/${slug}/`)}
          />

          {featuredInstitutes.map(inst => (
            <InstituteCard
              key={inst.id}
              institute={inst}
              onViewDetails={slug => onNavigate(`/college/${slug}/`)}
              onEnquireNow={(col, crs) => onOpenEnquiry(col, crs)}
            />
          ))}
        </div>
      </section>

      {/* 3. MBA Programs Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Degree Formats
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Explore MBA Programs
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose the educational structure aligned with your professional experience and ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Full-time MBA */}
          <div
            onClick={() => onNavigate('/courses/mba/')}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                Full-Time MBA
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Intensive 1 to 2-year on-campus programs designed for accelerated functional shifts and career pivots.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>View Programs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Executive MBA */}
          <div
            onClick={() => onNavigate('/courses/executive-mba/')}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                Executive MBA (EMBA)
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Modular weekend and intensive residency tracks designed for senior executives and directors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>View Programs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Master in Management (MiM) */}
          <div
            onClick={() => onNavigate('/courses/mim/')}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                Master in Management (MiM)
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Pre-experience master's degree aimed at early-career graduates with 0-2 years of work experience.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>View Programs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: PGDM Programs */}
          <div
            onClick={() => onNavigate('/courses/pgdm/')}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                PGDM Programs
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Autonomous, industry-focused postgraduate diplomas incorporating real-time corporate mentorship.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>View Programs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Executive MBA Programs Showcase */}
      <section className="bg-slate-900 text-white py-14 rounded-3xl mx-2 sm:mx-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-900/60 px-2.5 py-1 rounded-full">
                Senior Leadership Tracks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Executive MBA Programs
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Modular and global executive formats tailored for leaders with 7+ years of management experience.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/courses/executive-mba/')}
              className="text-xs sm:text-sm font-semibold text-indigo-300 hover:text-white flex items-center gap-1.5"
            >
              <span>Explore All EMBA Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {executivePrograms.slice(0, 3).map(inst => (
              <div
                key={inst.id}
                className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 flex flex-col justify-between hover:border-indigo-500 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-indigo-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{inst.city}, {inst.country}</span>
                  </div>
                  <h3 className="font-bold text-lg text-white line-clamp-1">{inst.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1.5">{inst.description}</p>

                  <div className="my-4 py-2 px-3 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                      <span className="font-semibold text-white">Modular EMBA</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                      <span className="font-semibold text-white">{inst.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/college/${inst.slug}/`)}
                    className="text-xs text-indigo-300 hover:text-white font-medium"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(inst.name, 'Executive MBA')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MBA by Country & Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Global Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            MBA by Country & Popular Destinations
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Discover management education opportunities across key economic hubs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {COUNTRIES.filter(c => c !== 'All Countries').map(country => {
            const flag = countryFlags[country] || '🌐';
            const count = institutes.filter(i => i.country.toLowerCase() === country.toLowerCase()).length;
            const countrySlug = country.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <button
                key={country}
                onClick={() => onNavigate(`/mba-colleges/${countrySlug}/`)}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="text-2xl mb-2">{flag}</div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  {country}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {count > 0 ? `${count} Institute${count > 1 ? 's' : ''}` : 'Featured Directory'}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. MBA by Specialization */}
      <section className="bg-slate-50 py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
              Tailored Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              MBA by Specialization
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select specializations matching industry growth and your individual career objectives.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPECIALIZATIONS.filter(s => s !== 'All Specializations').map(spec => {
              const specSlug = spec.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <button
                  key={spec}
                  onClick={() => onNavigate(`/specializations/${specSlug}/`)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-blue-600">
                      {spec}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Recently Added Institutes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Directory Updates
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Recently Added Institutes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/mba-colleges/')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline"
          >
            Explore Complete Directory →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentlyAdded.map(inst => (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative h-32 bg-slate-100">
                <img src={inst.coverImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {inst.country}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => onNavigate(`/college/${inst.slug}/`)}
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                  >
                    {inst.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{inst.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-700">{inst.tuitionFee}</span>
                  <button
                    onClick={() => onNavigate(`/college/${inst.slug}/`)}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Admission Resources & Education Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Guides & Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Admission Resources & Education Articles
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Expert advice on MBA applications, tests, essays, scholarships, and salary returns.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/blog/')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
          >
            View All Articles →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map(art => (
            <ArticleCard
              key={art.id}
              article={art}
              onReadMore={slug => onNavigate(`/blog/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* 9. Final Student Enquiry CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Need Personalized Guidance on Business Schools?
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Submit an enquiry and connect directly with official admissions coordinators for program syllabi, fee structures, and application timelines.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry()}
                className="px-8 py-3.5 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-xl text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                Request Free Program Information
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
