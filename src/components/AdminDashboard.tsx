import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  FileText,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Sparkles,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Institute, EnquiryData, Article } from '../types/index.ts';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
  onRefreshData?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'institutes' | 'enquiries' | 'articles' | 'ads'>('institutes');
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
    fetchData();
  }, []);

  const handleCreateInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstitute.name || !newInstitute.city) {
      setStatusMessage({ type: 'error', text: 'Please fill in required fields.' });
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
    if (!confirm('Are you sure you want to delete this institute?')) return;
    try {
      const res = await fetch(`/api/institutes/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Institute deleted successfully.' });
        fetchData();
        if (onRefreshData) onRefreshData();
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to delete.' });
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Master Control Center</span>
          </div>
          <h1 className="text-2xl font-bold">Portal Administration</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage global institute profiles, student enquiries, articles, and sponsored advertising.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Institute</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="font-bold text-xs underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('institutes')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'institutes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Institutes ({institutes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
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
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'articles'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'ads'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Sidebar Advertisement</span>
        </button>
      </div>

      {/* Tab 1: Institutes */}
      {activeTab === 'institutes' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Registered Business Schools</h3>
            <span className="text-xs text-slate-500 font-medium">Click "View" to visit live page</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Institute</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Program Type</th>
                  <th className="py-3 px-4">Tuition Fee</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {institutes.map(inst => (
                  <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                      <img src={inst.logo} alt="" className="w-7 h-7 rounded-lg object-cover border" />
                      <div>
                        <div>{inst.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{inst.slug}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {inst.city}, {inst.country}
                    </td>
                    <td className="py-3 px-4">{inst.programType}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{inst.tuitionFee}</td>
                    <td className="py-3 px-4">
                      {inst.featured ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onNavigate(`/college/${inst.slug}/`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteInstitute(inst.slug)}
                        className="text-red-500 hover:text-red-700 font-medium text-xs p-1"
                        title="Delete Institute"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Student Lead Enquiries</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically captured from popup enquiry modals and dispatched via secure server notification.
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
              {enquiries.length} Leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Lead ID & Date</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">College & Program</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Background</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{enq.id}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{enq.fullName}</div>
                      <div className="text-slate-500">{enq.email}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{enq.mobileNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-blue-800">{enq.collegeName}</div>
                      <div className="text-slate-600">{enq.courseInterestedIn}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Intake: {enq.preferredIntake}</div>
                    </td>
                    <td className="py-3 px-4">
                      {enq.city}, {enq.country}
                    </td>
                    <td className="py-3 px-4">
                      <div>{enq.highestQualification}</div>
                      <div className="text-[10px] text-slate-400">{enq.workExperience}</div>
                      {enq.message && (
                        <div className="text-[10px] italic text-slate-500 mt-1 max-w-xs truncate">
                          "{enq.message}"
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status || 'New'}
                        onChange={e => handleUpdateStatus(enq.id!, e.target.value)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          enq.status === 'Contacted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : enq.status === 'In Review'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : enq.status === 'Closed'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="New">New Lead</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
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
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Education Articles & SEO Guides</h3>
            <button
              onClick={() => onNavigate('/blog/')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Browse Blog →
            </button>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map(art => (
              <div key={art.id} className="border border-slate-200 rounded-xl p-4 flex gap-3 hover:border-blue-300 transition-colors">
                <img src={art.coverImage} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{art.category}</span>
                  <h4
                    onClick={() => onNavigate(`/blog/${art.slug}/`)}
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1 mt-0.5"
                  >
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{art.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Advertisements */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Right Sidebar Sponsored Advertisement</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Active placement displayed on all Institute Profile pages and Article detail sidebars on desktop viewports.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 max-w-xl">
            <div>
              <strong className="text-slate-700">Ad Headline: </strong>
              <span>Top MBA Colleges in India</span>
            </div>
            <div>
              <strong className="text-slate-700">Body Copy: </strong>
              <span>Explore MBA programs, admissions, fees, placements and program details.</span>
            </div>
            <div>
              <strong className="text-slate-700">Call to Action (CTA): </strong>
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">Explore MBA Colleges</span>
            </div>
            <div>
              <strong className="text-slate-700">Outbound Target URL: </strong>
              <a
                href="https://nbs.edu.in/top-mba-colleges-in-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-mono"
              >
                https://nbs.edu.in/top-mba-colleges-in-india/
              </a>
            </div>
            <div>
              <strong className="text-slate-700">Compliance Label: </strong>
              <span className="text-emerald-700 font-semibold">Strictly Labeled as "Advertisement"</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Institute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
            <div className="bg-blue-700 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Add Business School / Institute</h3>
                <p className="text-xs text-blue-100">All fields required by directory schema</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white/10 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInstitute} className="p-5 space-y-3.5 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institute Name *</label>
                  <input
                    type="text"
                    required
                    value={newInstitute.name}
                    onChange={e => setNewInstitute({ ...newInstitute, name: e.target.value })}
                    placeholder="e.g. Narayana Business School"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={newInstitute.country}
                    onChange={e => setNewInstitute({ ...newInstitute, country: e.target.value })}
                    placeholder="e.g. India, USA, France"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newInstitute.city}
                    onChange={e => setNewInstitute({ ...newInstitute, city: e.target.value })}
                    placeholder="e.g. Ahmedabad, Paris, London"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Website URL *</label>
                  <input
                    type="url"
                    required
                    value={newInstitute.officialWebsite}
                    onChange={e => setNewInstitute({ ...newInstitute, officialWebsite: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newInstitute.description}
                  onChange={e => setNewInstitute({ ...newInstitute, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 resize-none"
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
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tuition Fee</label>
                  <input
                    type="text"
                    value={newInstitute.tuitionFee}
                    onChange={e => setNewInstitute({ ...newInstitute, tuitionFee: e.target.value })}
                    placeholder="INR 8,40,000 / USD 65,000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newInstitute.duration}
                    onChange={e => setNewInstitute({ ...newInstitute, duration: e.target.value })}
                    placeholder="2 Years"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
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
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={newInstitute.eligibility}
                  onChange={e => setNewInstitute({ ...newInstitute, eligibility: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Logo Image URL</label>
                  <input
                    type="url"
                    value={newInstitute.logo}
                    onChange={e => setNewInstitute({ ...newInstitute, logo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={newInstitute.coverImage}
                    onChange={e => setNewInstitute({ ...newInstitute, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Application URL</label>
                <input
                  type="url"
                  value={newInstitute.applicationUrl}
                  onChange={e => setNewInstitute({ ...newInstitute, applicationUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newInstitute.featured}
                    onChange={e => setNewInstitute({ ...newInstitute, featured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Feature this institute on homepage</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Save Institute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
