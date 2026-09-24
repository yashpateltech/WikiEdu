import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Tag, Bookmark, ExternalLink } from 'lucide-react';
import { Article } from '../types/index.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (college?: string, course?: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigate,
  onOpenEnquiry
}) => {
  // Schema.org Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: '2026-08-01',
    author: {
      '@type': 'Person',
      name: article.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Global MBA & Management Education Directory'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <SeoHead
        title={`${article.title} | Global MBA Directory Blog`}
        description={article.excerpt}
        canonicalPath={`/blog/${article.slug}/`}
        ogType="article"
        jsonLd={articleSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Articles', href: '/blog/' },
          { label: article.category, href: '/blog/' },
          { label: article.title }
        ]}
        onNavigate={onNavigate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2 Columns on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <article className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-10">
            {/* Meta tags & Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.country && (
                <span className="text-xs text-slate-500 font-medium">{article.country}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>

            {/* Author & Timestamp Bar */}
            <div className="flex items-center justify-between py-4 my-4 border-y border-slate-100 text-xs text-slate-500 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <div className="font-bold text-slate-800 text-sm">{article.author.name}</div>
                  <div className="text-[11px] text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden my-6 max-h-96">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lead Excerpt */}
            <div className="p-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl text-slate-800 font-medium text-sm leading-relaxed mb-6">
              {article.excerpt}
            </div>

            {/* Article Body Content */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return <p key={index}>{paragraph.trim()}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>Tags:</span>
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Bottom Back Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('/blog/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Request Admissions Info
            </button>
          </div>
        </div>

        {/* Right Sidebar on Desktop with Advertisement */}
        <div className="lg:col-span-1 space-y-6">
          {/* SIDEBAR ADVERTISEMENT: Top MBA Colleges in India -> NBS */}
          <AdvertisementCard />

          {/* Admissions Counseling Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Need Program Recommendations?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our directory matches your academic and work profile with MBA institutions across 16+ countries.
            </p>
            <button
              onClick={() => onOpenEnquiry()}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Get Free Counseling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
