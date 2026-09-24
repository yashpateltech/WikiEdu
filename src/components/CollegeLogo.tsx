import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface CollegeLogoProps {
  name: string;
  websiteUrl?: string;
  logoUrl?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: string;
}

export function extractDomain(url?: string): string {
  if (!url) return '';
  try {
    const cleanUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    return new URL(cleanUrl).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function getCollegeInitials(name: string): string {
  if (!name) return 'MBA';

  // Handle common parenthesized acronyms, e.g. "Indian Institute of Management Ahmedabad (IIM-A)"
  const match = name.match(/\(([A-Z0-9a-z-]+)\)/);
  if (match && match[1]) {
    return match[1].replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();
  }

  // Filter out stop words
  const stopWords = new Set(['OF', 'AND', 'THE', 'AT', 'FOR', 'IN', 'DE', 'DU', 'DES', 'LA', 'LE', 'UNIVERSITÄT', 'UNIVERSITY', 'SCHOOL']);
  const words = name
    .replace(/[()&,.'’]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0 && !stopWords.has(w.toUpperCase()));

  if (words.length >= 2) {
    return (words[0][0] + words[1][0] + (words[2] ? words[2][0] : '')).toUpperCase().slice(0, 3);
  }

  return name.slice(0, 3).toUpperCase();
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  name,
  websiteUrl,
  logoUrl,
  className = '',
  size = 'md',
  rounded = 'rounded-xl'
}) => {
  const domain = extractDomain(websiteUrl);

  // Priority: If logoUrl is already an official website favicon or image, use it;
  // otherwise generate Google's high-res website logo favicon for the domain.
  const primaryLogo =
    logoUrl && logoUrl.includes('google.com/s2/favicons')
      ? logoUrl
      : domain
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : logoUrl || '';

  const [currentSrc, setCurrentSrc] = useState<string>(primaryLogo);
  const [errorStep, setErrorStep] = useState<number>(0);

  const handleError = () => {
    if (errorStep === 0 && domain) {
      // Step 1 fallback: Try icon.horse
      setErrorStep(1);
      setCurrentSrc(`https://icon.horse/icon/${domain}`);
    } else if (errorStep === 1 && logoUrl && logoUrl !== primaryLogo) {
      // Step 2 fallback: Try explicit logoUrl
      setErrorStep(2);
      setCurrentSrc(logoUrl);
    } else {
      // Step 3 fallback: Monogram crest
      setErrorStep(3);
    }
  };

  const initials = getCollegeInitials(name);

  // Dimension classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-lg'
  }[size];

  // If monogram fallback triggered or no valid source available
  if (errorStep >= 3 || !currentSrc) {
    return (
      <div
        className={`${sizeClasses} ${rounded} bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white font-black flex flex-col items-center justify-center shadow-xs border border-white/40 shrink-0 select-none ${className}`}
        title={`${name} Official Monogram`}
      >
        <GraduationCap className={size === 'xl' ? 'w-6 h-6 mb-0.5 text-blue-200' : 'w-3 h-3 text-blue-200'} />
        <span className="leading-none tracking-tight">{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} ${rounded} bg-white flex items-center justify-center overflow-hidden border border-slate-200/80 shadow-xs shrink-0 p-1 relative ${className}`}
    >
      <img
        src={currentSrc}
        alt={`${name} official website logo`}
        onError={handleError}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};
