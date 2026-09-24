import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Sparkles,
  Tag,
  AlertCircle,
  Lock,
  Mail,
  Key,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  Globe,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { Institute, EnquiryData, Article } from '../types/index.ts';
import { COUNTRIES, PROGRAM_TYPES } from '../data/institutesData.ts';
import { CollegeLogo } from './CollegeLogo.tsx';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
  onRefreshData?: () => void;
}

const REQUIRED_ADMIN_EMAIL = 'yashpatelseo19@gmail.com';
const REQUIRED_ADMIN_PASS = 'Yp1311999@';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onRefreshData }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mba_admin_authenticated') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Tab & Data State
  const [activeTab, setActiveTab] = useState<'institutes' | 'enquiries' | 'articles' | 'ads'>('institutes');
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Institute Filter & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterProgramType, setFilterProgramType] = useState('All Program Types');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'standard'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Form State for New Institute
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    country: 'India',
    city: '',
    description: '',
    officialWebsite: 'https://',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    programType: 'Full-time MBA',
    tuitionFee: 'USD 45,000',
    duration: '2 Years (Full-Time)',
    eligibility: "Bachelor's degree with 50%+ and valid management test score.",
    specializations: 'Finance, Marketing, Business Analytics',
    applicationUrl: 'https://',
    featured: true
  });

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      // Send credentials to backend authentication endpoint
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('mba_admin_authenticated', 'true');
        localStorage.setItem('mba_admin_token', data.token || 'adm_token_active');
        localStorage.setItem('mba_admin_email', data.user?.email || REQUIRED_ADMIN_EMAIL);
        setIsAuthenticated(true);
        setStatusMessage({ type: 'success', text: `Welcome, Administrator (${REQUIRED_ADMIN_EMAIL})` });
        fetchData();
      } else {
        // Fallback credential check if server offline
        if (
          loginEmail.trim().toLowerCase() === REQUIRED_ADMIN_EMAIL.toLowerCase() &&
          loginPassword === REQUIRED_ADMIN_PASS
        ) {
          localStorage.setItem('mba_admin_authenticated', 'true');
          localStorage.setItem('mba_admin_token', 'adm_token_fallback');
          localStorage.setItem('mba_admin_email', REQUIRED_ADMIN_EMAIL);
          setIsAuthenticated(true);
          setStatusMessage({ type: 'success', text: `Welcome, Administrator (${REQUIRED_ADMIN_EMAIL})` });
          fetchData();
        } else {
          setLoginError(data.error || 'Invalid Administrator ID or Password. Please verify your credentials.');
        }
      }
    } catch (err: any) {
      // Offline fallback
      if (
        loginEmail.trim().toLowerCase() === REQUIRED_ADMIN_EMAIL.toLowerCase() &&
        loginPassword === REQUIRED_ADMIN_PASS
      ) {
        localStorage.setItem('mba_admin_authenticated', 'true');
        localStorage.setItem('mba_admin_token', 'adm_token_fallback');
        localStorage.setItem('mba_admin_email', REQUIRED_ADMIN_EMAIL);
        setIsAuthenticated(true);
        setStatusMessage({ type: 'success', text: `Welcome, Administrator (${REQUIRED_ADMIN_EMAIL})` });
        fetchData();
      } else {
        setLoginError('Authentication failed. Please verify your administrator credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('mba_admin_authenticated');
    localStorage.removeItem('mba_admin_token');
    localStorage.removeItem('mba_admin_email');
    setIsAuthenticated(false);
    setLoginPassword('');
    setStatusMessage({ type: 'success', text: 'You have been logged out securely.' });
  };

  // Auto-fill credentials button helper
  const handleFillCredentials = () => {
    setLoginEmail(REQUIRED_ADMIN_EMAIL);
    setLoginPassword(REQUIRED_ADMIN_PASS);
    setLoginError(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [instRes, enqRes, artRes] = await Promise.all([
        fetch('/api/institutes'),
        fetch('/api/enquiries'),
        fetch('/api/articles')
      ]);

      const instData = await instRes.json();
      const enqData = await enqRes.json();
      const artData = await artRes.json();

      if (instData.success) setInstitutes(instData.data);
      if (enqData.success) setEnquiries(enqData.data);
      if (artData.success) setArticles(artData.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Institute Filter & Pagination Calculations
  const filteredInstitutes = useMemo(() => {
    return institutes.filter(inst => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          inst.name.toLowerCase().includes(q) ||
          inst.slug.toLowerCase().includes(q) ||
          inst.city.toLowerCase().includes(q) ||
          inst.country.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Country filter
      if (filterCountry !== 'All Countries') {
        if (inst.country.toLowerCase() !== filterCountry.toLowerCase()) {
          return false;
        }
      }

      // Program Type filter
      if (filterProgramType !== 'All Program Types') {
        if (!inst.programType.toLowerCase().includes(filterProgramType.toLowerCase())) {
          return false;
        }
      }

      // Featured filter
      if (filterFeatured === 'featured' && !inst.featured) return false;
      if (filterFeatured === 'standard' && inst.featured) return false;

      return true;
    });
  }, [institutes, searchQuery, filterCountry, filterProgramType, filterFeatured]);

  const totalPages = Math.max(1, Math.ceil(filteredInstitutes.length / itemsPerPage));
  const paginatedInstitutes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInstitutes.slice(start, start + itemsPerPage);
  }, [filteredInstitutes, currentPage, itemsPerPage]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCountry, filterProgramType, filterFeatured]);

  const handleCreateInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstitute.name || !newInstitute.city) {
      setStatusMessage({ type: 'error', text: 'Please fill in required fields (Name and City).' });
      return;
    }

    try {
      const payload = {
        ...newInstitute,
        specializations: newInstitute.specializations.split(',').map(s => s.trim()).filter(Boolean),
        establishedYear: 2020,
        currency: newInstitute.country === 'India' ? 'INR' : 'USD'
      };

      const res = await fetch('/api/institutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (res.ok) {
        setStatusMessage({ type: 'success', text: `Institute "${newInstitute.name}" added successfully!` });
        setShowAddModal(false);
        fetchData();
        if (onRefreshData) onRefreshData();
      } else {
        setStatusMessage({ type: 'error', text: resData.error || 'Failed to create institute.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Submission error.' });
    }
  };

  const handleDeleteInstitute = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete institute: ${slug}?`)) return;
    try {
      const res = await fetch(`/api/institutes/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Institute removed from global registry.' });
        fetchData();
        if (onRefreshData) onRefreshData();
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to delete institute.' });
    }
  };

  const handleToggleFeatured = async (inst: Institute) => {
    try {
      const updated = { ...inst, featured: !inst.featured };
      const res = await fetch(`/api/institutes/${inst.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !inst.featured })
      });
      if (res.ok) {
        setInstitutes(prev => prev.map(i => (i.slug === inst.slug ? updated : i)));
        setStatusMessage({
          type: 'success',
          text: `Updated featured status for ${inst.name}`
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status: status as any } : e)));
        setStatusMessage({ type: 'success', text: `Updated status for lead ${id} to ${status}` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // Render: Admin Login Screen (if not logged in)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Portal Identity */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Admin Access Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Management & Control Center for Global MBA Institutes
            </p>
          </div>

          {/* Credentials Info Helper Card */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 space-y-2">
            <div className="flex items-center justify-between font-bold text-blue-950">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                Configured Administrator Credentials
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-[11px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono bg-white/70 p-2.5 rounded-xl border border-blue-200/60">
              <div>
                <span className="text-slate-500 block text-[10px]">Admin ID / Email:</span>
                <span className="font-semibold text-slate-800 break-all">{REQUIRED_ADMIN_EMAIL}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Password:</span>
                <span className="font-semibold text-slate-800">{REQUIRED_ADMIN_PASS}</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Admin ID / Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="yashpatelseo19@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm text-slate-900 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loginLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authenticate & Enter Admin Panel</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-xs text-slate-500 hover:text-slate-700 font-medium underline cursor-pointer"
                >
                  Return to Public Education Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Authenticated Dashboard
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Banner & Admin Profile Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Session</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
              <Mail className="w-3.5 h-3.5" />
              <span>{REQUIRED_ADMIN_EMAIL}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Portal Administration</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control center for 1,000+ global institutes, student enquiries, articles, and sponsored advertising.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Institute</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Institutes</span>
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {institutes.length.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">1000 Verified Business Schools</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Enquiries</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{enquiries.length}</div>
          <span className="text-[11px] text-indigo-600 font-medium">Auto-dispatched to admin</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Countries Covered</span>
            <Globe className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">17</div>
          <span className="text-[11px] text-slate-500 font-medium">US, UK, India, France, Germany, etc.</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Published Articles</span>
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{articles.length}</div>
          <span className="text-[11px] text-amber-600 font-medium">Admissions & MBA Guides</span>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="font-bold text-xs underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('institutes')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'institutes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Institutes Directory ({institutes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'enquiries'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'articles'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles & Resources ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'ads'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Sidebar Advertisement</span>
        </button>
      </div>

      {/* Tab 1: Institutes (1,000 Institutes with Search, Filter & Pagination) */}
      {activeTab === 'institutes' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs space-y-4 p-4 sm:p-6">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Global Institutes Registry</h3>
              <p className="text-xs text-slate-500">
                Browse, search, edit, feature, or remove business schools in the 1,000 institutes database.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start lg:self-auto">
              Showing {paginatedInstitutes.length} of {filteredInstitutes.length} matching ({institutes.length} total)
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search college, city, slug..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <select
                value={filterCountry}
                onChange={e => setFilterCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700 bg-white"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filterProgramType}
                onChange={e => setFilterProgramType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700 bg-white"
              >
                {PROGRAM_TYPES.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filterFeatured}
                onChange={e => setFilterFeatured(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700 bg-white"
              >
                <option value="all">All Featured & Standard</option>
                <option value="featured">Featured Only</option>
                <option value="standard">Standard Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Institute</th>
                  <th className="py-3 px-4">Country & City</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Tuition Fee</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedInstitutes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No institutes match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedInstitutes.map(inst => (
                    <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                        <CollegeLogo
                          name={inst.name}
                          websiteUrl={inst.officialWebsite}
                          logoUrl={inst.logo}
                          size="sm"
                          rounded="rounded-lg"
                        />
                        <div className="min-w-0">
                          <div className="truncate max-w-[200px] sm:max-w-xs font-bold text-slate-900">
                            {inst.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                            {inst.slug}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-slate-800">{inst.city}</span>, {inst.country}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium">
                          {inst.programType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-700 whitespace-nowrap">
                        {inst.tuitionFee}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(inst)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            inst.featured
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {inst.featured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => onNavigate(`/college/${inst.slug}/`)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteInstitute(inst.slug)}
                          className="text-red-500 hover:text-red-700 font-medium text-xs p-1 cursor-pointer"
                          title="Delete Institute"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Page <span className="font-bold text-slate-800">{currentPage}</span> of{' '}
                <span className="font-bold text-slate-800">{totalPages}</span> ({filteredInstitutes.length} total colleges)
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-lg">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Student Enquiries</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Leads captured from enquiry forms and automatically notified to{' '}
                <strong className="text-slate-800">{REQUIRED_ADMIN_EMAIL}</strong>.
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
              {enquiries.length} Inquiries Logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Lead ID & Date</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">College Interested In</th>
                  <th className="py-3 px-4">Program & Intake</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map(enq => (
                  <tr key={enq.id || `enq-${Math.random()}`} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{enq.id || 'N/A'}</div>
                      <div className="text-[10px] text-slate-400">
                        {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent'}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{enq.fullName}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{enq.email}</div>
                      <div className="text-slate-400">{enq.mobileNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900">{enq.collegeName}</span>
                      <div className="text-slate-400 text-[10px]">
                        {enq.city}, {enq.country}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-blue-700">{enq.courseInterestedIn}</div>
                      <div className="text-[10px] text-slate-400">{enq.preferredIntake}</div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status || 'New'}
                        onChange={e => handleUpdateStatus(enq.id || '', e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold border cursor-pointer ${
                          enq.status === 'New'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : enq.status === 'In Review'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Review">In Review</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Articles */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Education Articles & Editorial Guides</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
              {articles.length} Published
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {articles.map(art => (
              <div key={art.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <img
                    src={art.coverImage}
                    alt=""
                    className="w-16 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors">
                      {art.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold">
                        {art.category}
                      </span>
                      <span>•</span>
                      <span>Published {art.publishedDate}</span>
                      <span>•</span>
                      <span>By {typeof art.author === 'object' ? art.author?.name : art.author}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate(`/blog/${art.slug}/`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Sidebar Advertisement */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Right Sidebar Sponsored Placement</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Configured Directory Advertisement</h3>
            <p className="text-xs text-slate-500 mt-1">
              Currently active on all institute detail pages, article pages, and search directory desktop views.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 max-w-md space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase tracking-wider">
              <span>Advertisement Preview</span>
              <span className="bg-amber-200/60 px-2 py-0.5 rounded text-[10px]">Sponsored</span>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Top MBA Colleges in India</h4>
              <p className="text-xs text-slate-600">
                Explore MBA programs, admissions, fees, placements and program details.
              </p>
            </div>

            <a
              href="https://nbs.edu.in/top-mba-colleges-in-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>Explore MBA Colleges</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="text-[10px] text-slate-400 font-mono break-all pt-1 border-t border-amber-200/40">
              Target URL: https://nbs.edu.in/top-mba-colleges-in-india/
            </div>
          </div>
        </div>
      )}

      {/* Add New Institute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Add New Business School</h3>
                <p className="text-xs text-slate-500">
                  New profile will be added to the registry of 1,000 institutes.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInstitute} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Institute Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInstitute.name}
                  onChange={e => setNewInstitute({ ...newInstitute, name: e.target.value })}
                  placeholder="e.g. Oxford Said Business School"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country</label>
                  <select
                    value={newInstitute.country}
                    onChange={e => setNewInstitute({ ...newInstitute, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  >
                    {COUNTRIES.filter(c => c !== 'All Countries').map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newInstitute.city}
                    onChange={e => setNewInstitute({ ...newInstitute, city: e.target.value })}
                    placeholder="e.g. London / Ahmedabad"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Website</label>
                <input
                  type="url"
                  value={newInstitute.officialWebsite}
                  onChange={e => setNewInstitute({ ...newInstitute, officialWebsite: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newInstitute.description}
                  onChange={e => setNewInstitute({ ...newInstitute, description: e.target.value })}
                  placeholder="Overview of the business school curriculum and institutional achievements..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program Type</label>
                  <input
                    type="text"
                    value={newInstitute.programType}
                    onChange={e => setNewInstitute({ ...newInstitute, programType: e.target.value })}
                    placeholder="Full-time MBA / PGDM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tuition Fee</label>
                  <input
                    type="text"
                    value={newInstitute.tuitionFee}
                    onChange={e => setNewInstitute({ ...newInstitute, tuitionFee: e.target.value })}
                    placeholder="INR 8,40,000 / USD 65,000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newInstitute.duration}
                    onChange={e => setNewInstitute({ ...newInstitute, duration: e.target.value })}
                    placeholder="2 Years"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specializations (comma-separated)</label>
                <input
                  type="text"
                  value={newInstitute.specializations}
                  onChange={e => setNewInstitute({ ...newInstitute, specializations: e.target.value })}
                  placeholder="Finance, Marketing, Analytics, Strategy"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newInstitute.featured}
                    onChange={e => setNewInstitute({ ...newInstitute, featured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-700">Feature this institute on homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer"
                >
                  Save to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
