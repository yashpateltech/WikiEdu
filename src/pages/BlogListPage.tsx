import React, { useState } from 'react';
import { Article } from '../types/index.ts';
import { ArticleCard } from '../components/ArticleCard.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { AdvertisementCard } from '../components/AdvertisementCard.tsx';
import { BLOG_CATEGORIES } from '../data/articlesData.ts';

interface BlogListPageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ articles, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <SeoHead
        title="MBA & Management Education Blog | Admissions, Fees & Specializations"
        description="Comprehensive analysis, expert guides, and articles covering MBA admissions, Executive MBA programs, tuition fees, scholarships, and career outcomes."
        canonicalPath="/blog/"
      />

      <Breadcrumbs
        items={[{ label: 'Blog & Articles' }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full">
          Education Insights & Admissions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
          Education Articles & Guides
        </h1>
        <p className="text-sm sm:text-base text-blue-200 mt-2 max-w-2xl leading-relaxed">
          Navigate your business school journey with pragmatic insights on admissions, GMAT strategies, fee planning, and specialization trajectories.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {BLOG_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              No articles found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onReadMore={slug => onNavigate(`/blog/${slug}/`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AdvertisementCard />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Editorial Standards</h4>
            <p className="leading-relaxed">
              Our articles are produced by seasoned academic advisors and former admissions directors to provide unbiased, accurate information for prospective students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
