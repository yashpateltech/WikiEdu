import React from 'react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types/index.ts';

interface ArticleCardProps {
  article: Article;
  onReadMore: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadMore }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Featured Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
          {article.category}
        </div>
        {article.country && (
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            {article.country}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
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

          {/* Title */}
          <h3
            onClick={() => onReadMore(article.slug)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {article.title}
          </h3>

          {/* Short excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Read More Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-slate-600 font-medium">{article.author.name}</span>
          </div>

          <button
            onClick={() => onReadMore(article.slug)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
