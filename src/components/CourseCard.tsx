import React from 'react';
import { Clock, DollarSign, Award, CheckCircle, BookOpen, Send } from 'lucide-react';
import { Course } from '../types/index.ts';

interface CourseCardProps {
  course: Course;
  instituteName: string;
  onApply: (courseName: string, instituteName: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, instituteName, onApply }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              {course.type}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">{course.name}</h4>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {course.mode}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          {course.overview}
        </p>

        {/* Duration and Fees */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
            <div className="flex items-center gap-1 font-semibold text-slate-800 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Tuition Fee</span>
            <div className="flex items-center gap-1 font-semibold text-emerald-700 mt-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>{course.tuitionFee}</span>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-3 text-xs text-slate-600">
          <strong className="text-slate-700">Eligibility: </strong>
          <span>{course.eligibility}</span>
        </div>

        {/* Specialization Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {course.specializations.map((spec, i) => (
            <span
              key={i}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Official Admissions Open</span>
        <button
          onClick={() => onApply(course.name, instituteName)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-3 h-3" />
          <span>Apply / Get Details</span>
        </button>
      </div>
    </div>
  );
};
