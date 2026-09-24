import React, { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  // Schema.org BreadcrumbList structured data
  useEffect(() => {
    const origin = window.location.origin;
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${origin}/`
        },
        ...items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: item.label,
          item: item.href ? `${origin}${item.href}` : window.location.href
        }))
      ]
    };

    const scriptId = 'breadcrumb-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs md:text-sm text-slate-500 py-3 mb-4 overflow-x-auto whitespace-nowrap">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center hover:text-blue-600 transition-colors focus:outline-none"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-slate-400" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 flex-shrink-0" />
            {item.href && !isLast ? (
              <button
                onClick={() => onNavigate(item.href!)}
                className="hover:text-blue-600 transition-colors focus:outline-none text-slate-600 font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-slate-900 font-semibold truncate max-w-xs md:max-w-md">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};
