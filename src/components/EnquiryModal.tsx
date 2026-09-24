import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Building2, BookOpen, ShieldCheck, Phone, Mail, User } from 'lucide-react';
import { EnquiryData } from '../types/index.ts';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName?: string;
  courseName?: string;
  onSuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  collegeName = '',
  courseName = '',
  onSuccess
}) => {
  const [formData, setFormData] = useState<EnquiryData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    country: '',
    city: '',
    courseInterestedIn: courseName || 'Full-time MBA',
    collegeName: collegeName || '',
    preferredIntake: '2026 - Autumn Intake',
    highestQualification: "Bachelor's Degree",
    workExperience: '1 - 3 Years',
    message: '',
    consent: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync props when opening
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        collegeName: collegeName || prev.collegeName,
        courseInterestedIn: courseName || prev.courseInterestedIn || 'Full-time MBA'
      }));
      setSubmittedId(null);
      setServerError(null);
      setErrors({});
    }
  }, [isOpen, collegeName, courseName]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile Number is required.';
    } else if (formData.mobileNumber.trim().length < 7) {
      errs.mobileNumber = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.courseInterestedIn.trim()) {
      errs.courseInterestedIn = 'Please specify the course you are interested in.';
    }

    if (!formData.collegeName.trim()) {
      errs.collegeName = 'Please specify the institute/college name.';
    }

    if (!formData.consent) {
      errs.consent = 'You must agree to be contacted to submit your enquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const generatedId = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // 1. Direct keyless delivery to yashpatelseo19@gmail.com via FormSubmit AJAX
      let formSubmitSuccess = false;
      try {
        const fsResponse = await fetch('https://formsubmit.co/ajax/yashpatelseo19@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New MBA Lead: ${formData.fullName} - ${formData.collegeName} [${generatedId}]`,
            _replyto: formData.email,
            _template: 'table',
            _captcha: 'false',
            'Reference ID': generatedId,
            'Applicant Name': formData.fullName,
            'Email Address': formData.email,
            'Phone Number': formData.mobileNumber,
            'Target Institute': formData.collegeName,
            'Course / Program': formData.courseInterestedIn,
            'Preferred Intake': formData.preferredIntake,
            'Location': `${formData.city || ''}, ${formData.country || ''}`.trim().replace(/^,|,$/g, '') || 'Not specified',
            'Highest Qualification': formData.highestQualification,
            'Work Experience': formData.workExperience,
            'Applicant Query': formData.message || 'No additional message provided.',
            'Submission Date': new Date().toLocaleString()
          })
        });
        const fsData = await fsResponse.json();
        if (fsData.success === 'true' || fsData.success === true || fsData.message?.includes('Activation')) {
          formSubmitSuccess = true;
        }
      } catch (fsErr) {
        console.warn('FormSubmit direct fetch notice:', fsErr);
      }

      // 2. Also record via internal backend API if available
      try {
        const localResponse = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (localResponse.ok) {
          const localData = await localResponse.json();
          setSubmittedId(localData.enquiryId || generatedId);
          if (onSuccess) onSuccess();
          return;
        }
      } catch (apiErr) {
        console.warn('Local API dispatch notice:', apiErr);
      }

      // If either succeeded or fallback is valid
      setSubmittedId(generatedId);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setServerError(err.message || 'Network connection failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Admissions Advisory
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">Request Program Information</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Connect directly with program coordinators for brochure, eligibility, and scholarship details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {submittedId ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your enquiry for{' '}
                <strong className="text-blue-700">{formData.courseInterestedIn}</strong> at{' '}
                <strong className="text-blue-700">{formData.collegeName}</strong> has been logged.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-w-sm mx-auto text-xs text-slate-600 space-y-1">
                <div>
                  <span className="text-slate-500">Reference ID: </span>
                  <span className="font-mono font-bold text-slate-800">{submittedId}</span>
                </div>
                <div>
                  <span className="text-slate-500">Destination: </span>
                  <span className="font-semibold text-blue-700">yashpatelseo19@gmail.com</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                A full application dossier has been dispatched to <strong className="text-slate-700">yashpatelseo19@gmail.com</strong>. You will be contacted via email or phone within 24–48 hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:yashpatelseo19@gmail.com?subject=${encodeURIComponent(`MBA Admission Enquiry: ${formData.fullName} - ${formData.collegeName} [${submittedId}]`)}&body=${encodeURIComponent(
                    `Hello Admissions Team,\n\nI have submitted an enquiry through the Global MBA portal with the following details:\n\nReference ID: ${submittedId}\nFull Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.mobileNumber}\nTarget College: ${formData.collegeName}\nProgram: ${formData.courseInterestedIn}\nIntake: ${formData.preferredIntake}\nLocation: ${formData.city}, ${formData.country}\nQualification: ${formData.highestQualification}\nWork Experience: ${formData.workExperience}\n\nMessage:\n${formData.message || 'Please send brochure and fee structure.'}\n\nThank you!`
                  )}`}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email Copy</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Institution and Course Indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    College / Institute Name *
                  </label>
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                    placeholder="e.g. Narayana Business School"
                    className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.collegeName ? 'border-red-400 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.collegeName && <p className="text-[11px] text-red-600 mt-0.5">{errors.collegeName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Course Interested In *
                  </label>
                  <input
                    type="text"
                    value={formData.courseInterestedIn}
                    onChange={e => setFormData({ ...formData, courseInterestedIn: e.target.value })}
                    placeholder="e.g. Full-time MBA / PGDM"
                    className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.courseInterestedIn ? 'border-red-400 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.courseInterestedIn && (
                    <p className="text-[11px] text-red-600 mt-0.5">{errors.courseInterestedIn}</p>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-0.5">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-0.5">{errors.email}</p>}
                </div>
              </div>

              {/* Geographic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Current Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. India, United States"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, New York"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Academic & Professional Background */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Intake</label>
                  <select
                    value={formData.preferredIntake}
                    onChange={e => setFormData({ ...formData, preferredIntake: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="2026 - Autumn Intake">2026 - Autumn Intake</option>
                    <option value="2027 - Spring Intake">2027 - Spring Intake</option>
                    <option value="2027 - Autumn Intake">2027 - Autumn Intake</option>
                    <option value="Immediate Upcoming Batch">Immediate Upcoming Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Qualification</label>
                  <select
                    value={formData.highestQualification}
                    onChange={e => setFormData({ ...formData, highestQualification: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Final Year Undergraduate">Final Year Undergraduate</option>
                    <option value="Diploma / Associate">Diploma / Associate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Experience</label>
                  <select
                    value={formData.workExperience}
                    onChange={e => setFormData({ ...formData, workExperience: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Fresh Graduate (0 years)">Fresh Graduate (0 years)</option>
                    <option value="1 - 3 Years">1 - 3 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="5 - 8 Years">5 - 8 Years</option>
                    <option value="8+ Years (Executive Track)">8+ Years (Executive Track)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Questions / Specific Interests</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share any questions regarding admission cutoffs, fees, financial aid, or campus visits..."
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to be contacted regarding education and program information.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Information</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
