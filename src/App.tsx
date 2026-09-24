import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { DirectoryPage } from './pages/DirectoryPage.tsx';
import { InstituteDetailPage } from './pages/InstituteDetailPage.tsx';
import { BlogListPage } from './pages/BlogListPage.tsx';
import { ArticleDetailPage } from './pages/ArticleDetailPage.tsx';
import { CoursesPage } from './pages/CoursesPage.tsx';
import { SpecializationsPage } from './pages/SpecializationsPage.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { INITIAL_INSTITUTES } from './data/institutesData.ts';
import { INITIAL_ARTICLES } from './data/articlesData.ts';
import { Institute, Article } from './types/index.ts';
import { Send, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [institutes, setInstitutes] = useState<Institute[]>(INITIAL_INSTITUTES);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryModalCollege, setEnquiryModalCollege] = useState('');
  const [enquiryModalCourse, setEnquiryModalCourse] = useState('');

  // Handle client-side history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // Standardize trailing slash for clean URLs
    const cleanPath = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', cleanPath);
      setCurrentPath(cleanPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync with API data if server running
  const refreshInstitutes = async () => {
    try {
      const res = await fetch('/api/institutes');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setInstitutes(data.data);
        }
      }
    } catch (err) {
      // Fallback to initial state
    }
  };

  useEffect(() => {
    refreshInstitutes();
  }, []);

  const openEnquiry = (college?: string, course?: string) => {
    setEnquiryModalCollege(college || '');
    setEnquiryModalCourse(course || '');
    setEnquiryModalOpen(true);
  };

  // Router parsing
  const renderRoute = () => {
    const path = currentPath.toLowerCase();

    // 1. Home Page
    if (path === '/' || path === '') {
      return (
        <HomePage
          institutes={institutes}
          articles={articles}
          onNavigate={navigate}
          onOpenEnquiry={openEnquiry}
          onSearch={({ query, country, city, specialization }) => {
            const params = new URLSearchParams();
            if (query) params.set('q', query);
            if (country && country !== 'All Countries') params.set('country', country);
            if (city) params.set('city', city);
            if (specialization && specialization !== 'All Specializations') params.set('spec', specialization);

            if (country && country !== 'All Countries') {
              const countrySlug = country.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              navigate(`/mba-colleges/${countrySlug}/`);
            } else {
              navigate('/mba-colleges/');
            }
          }}
        />
      );
    }

    // 2. Admin Portal (/admin/)
    if (path.startsWith('/admin')) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdminDashboard
            onNavigate={navigate}
            onRefreshData={refreshInstitutes}
          />
        </div>
      );
    }

    // 3. College Detail Page (/college/:slug/)
    if (path.startsWith('/college/')) {
      const slug = path.replace('/college/', '').replace(/\/$/, '');
      const institute = institutes.find(i => i.slug.toLowerCase() === slug.toLowerCase());
      if (institute) {
        return (
          <InstituteDetailPage
            institute={institute}
            onNavigate={navigate}
            onOpenEnquiry={openEnquiry}
          />
        );
      }
      return (
        <div className="max-w-3xl mx-auto py-16 text-center px-4">
          <h2 className="text-2xl font-bold text-slate-800">College Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The institute profile requested may have been relocated.</p>
          <button
            onClick={() => navigate('/mba-colleges/')}
            className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
          >
            Explore Directory
          </button>
        </div>
      );
    }

    // 4. Directory by Country (/mba-colleges/:country/)
    if (path.startsWith('/mba-colleges/')) {
      const countrySlug = path.replace('/mba-colleges/', '').replace(/\/$/, '');
      return (
        <DirectoryPage
          institutes={institutes}
          currentCountry={countrySlug || undefined}
          onNavigate={navigate}
          onOpenEnquiry={openEnquiry}
        />
      );
    }

    // 5. Courses by Program Type (/courses/:program/)
    if (path.startsWith('/courses/')) {
      const programSlug = path.replace('/courses/', '').replace(/\/$/, '') || 'mba';
      return (
        <CoursesPage
          programSlug={programSlug}
          institutes={institutes}
          onNavigate={navigate}
          onOpenEnquiry={openEnquiry}
        />
      );
    }

    // 6. Specializations (/specializations/:spec/)
    if (path.startsWith('/specializations/')) {
      const specSlug = path.replace('/specializations/', '').replace(/\/$/, '') || 'finance';
      return (
        <SpecializationsPage
          specializationSlug={specSlug}
          institutes={institutes}
          onNavigate={navigate}
          onOpenEnquiry={openEnquiry}
        />
      );
    }

    // 7. Blog Detail (/blog/:slug/)
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').replace(/\/$/, '');
      if (slug) {
        const article = articles.find(a => a.slug.toLowerCase() === slug.toLowerCase());
        if (article) {
          return (
            <ArticleDetailPage
              article={article}
              onNavigate={navigate}
              onOpenEnquiry={openEnquiry}
            />
          );
        }
      }
      // Blog List
      return <BlogListPage articles={articles} onNavigate={navigate} />;
    }

    // Default Fallback
    return (
      <div className="max-w-3xl mx-auto py-20 text-center px-4">
        <h2 className="text-3xl font-black text-slate-800">404 - Page Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested educational resource does not exist or has moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-sm"
        >
          Return to Home Directory
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white font-sans text-slate-900">
      {/* Top Advisory Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Global 2026/2027 Admissions Open across 16+ countries</span>
          <span className="hidden sm:inline">• Free Student Advisory & Eligibility Check</span>
        </span>
      </div>

      {/* Main Header */}
      <Header
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenEnquiry={openEnquiry}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Sticky Enquiry Button for Mobile Viewports */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => openEnquiry()}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-xl shadow-blue-900/30 hover:shadow-2xl transition-all cursor-pointer border border-white/20 active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>Enquire Now</span>
        </button>
      </div>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Enquiry Popup Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        collegeName={enquiryModalCollege}
        courseName={enquiryModalCourse}
      />
    </div>
  );
}
