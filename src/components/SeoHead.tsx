import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  jsonLd
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);

    const fullUrl = `${window.location.origin}${canonicalPath || window.location.pathname}`;
    setMeta('property', 'og:url', fullUrl);

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Default Organization Schema
    const orgScriptId = 'schema-org-jsonld';
    let orgScript = document.getElementById(orgScriptId) as HTMLScriptElement;
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.id = orgScriptId;
      orgScript.type = 'application/ld+json';
      document.head.appendChild(orgScript);
      orgScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Global MBA & Management Education Directory',
        url: window.location.origin,
        logo: `${window.location.origin}/logo.svg`,
        description: 'Independent global education portal for discovering and comparing MBA, Executive MBA, and business programs worldwide.'
      });
    }

    // 5. Page-specific Schema (Course, Article, FAQ, etc.)
    const customScriptId = 'custom-page-jsonld';
    let customScript = document.getElementById(customScriptId) as HTMLScriptElement;
    if (jsonLd) {
      if (!customScript) {
        customScript = document.createElement('script');
        customScript.id = customScriptId;
        customScript.type = 'application/ld+json';
        document.head.appendChild(customScript);
      }
      customScript.textContent = JSON.stringify(jsonLd);
    } else if (customScript) {
      customScript.remove();
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, canonicalPath, ogType, jsonLd]);

  return null;
};
