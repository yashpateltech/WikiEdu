import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Award,
  ExternalLink,
  Send,
  Building2,
  GraduationCap,
  Briefcase,
  FileCheck,
  Globe2,
  Calendar,
  CheckCircle,
  HelpCircle,
  Share2,
  BookOpen
} from 'lucide-react';
import { Institute } from '../types/index.ts';
import { CourseCard } from '../components/CourseCard.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';

interface InstituteDetailPageProps {
  institute: Institute;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const InstituteDetailPage: React.FC<InstituteDetailPageProps> = ({
  institute,
  onNavigate,
  onOpenEnquiry
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'admissions' | 'careers' | 'campus'>('overview');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Schema.org Course and EducationalOrganization JSON-LD
  const schemaJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: institute.name,
      description: institute.description,
      url: institute.officialWebsite,
      address: {
        '@type': 'PostalAddress',
        addressLocality: institute.city,
        addressCountry: institute.country
      }
    },
    ...institute.courses.map(course => ({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${institute.name} - ${course.name}`,
      description: course.overview,
      provider: {
        '@type': 'EducationalOrganization',
        name: institute.name,
        sameAs: institute.officialWebsite
      },
      timeRequired: course.duration,
      courseMode: course.mode
    })),
    ...(institute.faqs && institute.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: institute.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]
      : [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <SeoHead
        title={`${institute.name} - MBA Programs, Admissions, Fees & Eligibility`}
        description={`Explore MBA and executive programs at ${institute.name}, ${institute.city}, ${institute.country}. Check tuition fees, eligibility, course duration, and request official details.`}
        canonicalPath={`/college/${institute.slug}/`}
        jsonLd={schemaJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Colleges', href: '/mba-colleges/' },
          { label: institute.country, href: `/mba-colleges/${institute.countrySlug}/` },
          { label: institute.name }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Cover Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={institute.coverImage}
            alt={institute.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

          {/* Quick Share and Location Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy page link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>

          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{institute.city}, {institute.country}</span>
            </span>

            {institute.featured && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>Featured Institution</span>
              </span>
            )}
          </div>
        </div>

        {/* Profile Details & CTA Bar */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden flex-shrink-0 -mt-14 sm:-mt-16 z-10 p-1">
                <img
                  src={institute.logo}
                  alt={`${institute.name} logo`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {institute.programType}
                  </span>
                  <span className="text-xs text-slate-400">Established {institute.establishedYear}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {institute.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  {institute.description}
                </p>
              </div>
            </div>

            {/* CTAs: Request Information & Official Website */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={institute.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              {/* Prominent "Request Information" button */}
              <button
                onClick={() => onOpenEnquiry(institute.name, institute.courses[0]?.name || institute.programType)}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request Information</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">{institute.duration}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tuition Fee</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{institute.tuitionFee}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Accreditation</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">
                {institute.accreditedBy.join(', ')}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Admissions Status</span>
              <span className="font-bold text-blue-700 text-sm mt-0.5 block">Applications Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Content + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Institute Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Institute Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Programs & Courses ({institute.courses.length})
            </button>
            <button
              onClick={() => setActiveTab('admissions')}
              className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'admissions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Admissions & Fees
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Careers & Campus
            </button>
          </div>

          {/* Section 1: Overview */}
          {(activeTab === 'overview' || activeTab === 'courses') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>About {institute.name}</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {institute.overview}
              </p>

              {/* Specializations offered */}
              <div className="pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Specializations Offered
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {institute.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Programs & MBA Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Programs & Course Details</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">{institute.courses.length} Options</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {institute.courses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  instituteName={institute.name}
                  onApply={(cName, iName) => onOpenEnquiry(iName, cName)}
                />
              ))}
            </div>
          </div>

          {/* Section 3: Admissions, Eligibility, & Scholarships */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>Admissions & Eligibility</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Eligibility Criteria</h3>
                <p>{institute.eligibility}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Application Process</h3>
                <p>{institute.applicationProcess}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Scholarships & Financial Aid</h3>
                <p>{institute.scholarships}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <a
                href={institute.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Direct Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onOpenEnquiry(institute.name, institute.courses[0]?.name)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Get Admissions Assistance
              </button>
            </div>
          </div>

          {/* Section 4: Careers, Campus, & International Student Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span>Campus Life & Career Information</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Career & Placements Support</h3>
                <p>{institute.careerInfo}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Campus Infrastructure & Facilities</h3>
                <p>{institute.campusInfo}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">International Student Services & Visa</h3>
                <p>{institute.internationalInfo}</p>
              </div>
            </div>
          </div>

          {/* Section 5: FAQs (if available) */}
          {institute.faqs && institute.faqs.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-3">
                {institute.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{faq.question}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Enquiry Callout */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Ready to apply to {institute.name}?</h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Receive free syllabus information, deadline updates, and scholarship details.
              </p>
            </div>
            <button
              onClick={() => onOpenEnquiry(institute.name, institute.courses[0]?.name)}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex-shrink-0 cursor-pointer"
            >
              Request Information
            </button>
          </div>
        </div>

        {/* Right Column: Sidebar Advertisement & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Contact & Action Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Admissions Helpline</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit your candidate profile for personalized counseling on deadlines and financial scholarships.
            </p>
            <button
              onClick={() => onOpenEnquiry(institute.name)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Information</span>
            </button>
          </div>

          {/* RIGHT SIDEBAR ADVERTISEMENT: Top MBA Colleges in India -> NBS */}
          <AdvertisementCard />

          {/* Academic Accreditations */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 text-xs text-slate-600 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Accreditation & Approvals
            </h4>
            <div className="space-y-1.5">
              {institute.accreditedBy.map((acc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-200">
              Information sourced from public university disclosure catalogs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
