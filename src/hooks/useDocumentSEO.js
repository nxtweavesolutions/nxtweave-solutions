// src/hooks/useDocumentSEO.js
import { useEffect } from "react";

export function useDocumentSEO(title, description, keywords, canonicalPath) {
  useEffect(() => {
    // 1. Page Title
    const siteName = "NxtWeave Solutions";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Business Registration & Digital Growth`;
    document.title = fullTitle;

    // Helper to create or update meta tags
    const updateMeta = (nameOrProp, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameOrProp}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameOrProp, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Descriptions & Keywords
    if (description) {
      updateMeta("name", "description", description);
      updateMeta("property", "og:description", description);
      updateMeta("name", "twitter:description", description);
    }

    if (keywords) {
      updateMeta("name", "keywords", keywords);
    }

    // 3. Open Graph & Twitter Titles
    updateMeta("property", "og:title", fullTitle);
    updateMeta("name", "twitter:title", fullTitle);
    updateMeta("property", "og:site_name", siteName);
    updateMeta("property", "og:type", canonicalPath && canonicalPath.includes("/blog/") ? "article" : "website");
    updateMeta("name", "twitter:card", "summary_large_image");

    // 4. Canonical URL & og:url synchronization
    const resolvedPath = canonicalPath !== undefined 
      ? canonicalPath 
      : window.location.pathname;
    const cleanPath = resolvedPath.startsWith("/") ? resolvedPath : `/${resolvedPath}`;
    const canonicalUrl = `https://www.nxtweavesolutions.com${cleanPath === "/" ? "" : cleanPath}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);
    updateMeta("property", "og:url", canonicalUrl);

  }, [title, description, keywords, canonicalPath]);
}
