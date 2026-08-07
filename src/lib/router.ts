"use client";

import { useEffect, useCallback } from "react";
import { useApp } from "@/lib/store";

/**
 * URL hash router — makes the SPA feel like real separate pages.
 * 
 * Routes:
 * #/                                    → Homepage
 * #/projects                            → Projects listing page
 * #/projects/[slug]                     → Project detail page
 * #/blog                                → Blog listing page
 * #/blog/[slug]                         → Blog post page
 * #/temples                             → Temples listing page
 * #/temples/[slug]                      → Temple detail page
 * #/about                               → About page
 * #/invest                              → Invest/EMI page
 * #/contact                             → Contact page
 * #/admin                               → Admin panel
 */

export type Route = 
  | { name: "home" }
  | { name: "projects" }
  | { name: "project"; slug: string }
  | { name: "plots" }
  | { name: "blog" }
  | { name: "blog-post"; slug: string }
  | { name: "temples" }
  | { name: "temple"; slug: string }
  | { name: "about" }
  | { name: "invest" }
  | { name: "contact" }
  | { name: "admin" };

export function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) return { name: "home" };
  
  if (parts[0] === "admin") return { name: "admin" };
  if (parts[0] === "projects" && parts.length === 1) return { name: "projects" };
  if (parts[0] === "projects" && parts[1]) return { name: "project", slug: parts[1] };
  if (parts[0] === "blog" && parts.length === 1) return { name: "blog" };
  if (parts[0] === "blog" && parts[1]) return { name: "blog-post", slug: parts[1] };
  if (parts[0] === "temples" && parts.length === 1) return { name: "temples" };
  if (parts[0] === "temples" && parts[1]) return { name: "temple", slug: parts[1] };
  if (parts[0] === "plots") return { name: "plots" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "invest") return { name: "invest" };
  if (parts[0] === "contact") return { name: "contact" };

  return { name: "home" };
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case "home": return "#/";
    case "admin": return "#/admin";
    case "projects": return "#/projects";
    case "project": return `#/projects/${route.slug}`;
    case "blog": return "#/blog";
    case "blog-post": return `#/blog/${route.slug}`;
    case "temples": return "#/temples";
    case "temple": return `#/temples/${route.slug}`;
    case "plots": return "#/plots";
    case "about": return "#/about";
    case "invest": return "#/invest";
    case "contact": return "#/contact";
  }
}

/** Navigate to a route — updates URL hash and store */
export function navigate(route: Route) {
  const hash = routeToHash(route);
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
  // Update store
  const store = useApp.getState();
  store.closeProjectPage();
  store.closeBlogPage();
  store.closeTemplePage();
  
  switch (route.name) {
    case "home":
      // All closed already
      break;
    case "admin":
      store.setView("admin");
      break;
    case "project":
      store.openProjectPage(route.slug);
      break;
    case "blog-post":
      store.openBlogPage(route.slug);
      break;
    case "temple":
      store.openTemplePage(route.slug);
      break;
    // Listing pages handled by route state in page.tsx
  }
  
  window.scrollTo({ top: 0, behavior: "instant" });
}

/** Hook that listens to hashchange and popstate events */
export function useHashRouter() {
  const {
    setView, openProjectPage, closeProjectPage,
    openBlogPage, closeBlogPage,
    openTemplePage, closeTemplePage,
  } = useApp();

  const handleRoute = useCallback(() => {
    const route = parseHash();

    // Close everything first
    closeProjectPage();
    closeBlogPage();
    closeTemplePage();

    switch (route.name) {
      case "home":
      case "projects":
      case "plots":
      case "blog":
      case "temples":
      case "about":
      case "invest":
      case "contact":
        setView("site");
        break;
      case "admin":
        setView("admin");
        break;
      case "project":
        setView("site");
        openProjectPage(route.slug);
        break;
      case "blog-post":
        setView("site");
        openBlogPage(route.slug);
        break;
      case "temple":
        setView("site");
        openTemplePage(route.slug);
        break;
      default:
        setView("site");
    }
  }, [setView, openProjectPage, closeProjectPage, openBlogPage, closeBlogPage, openTemplePage, closeTemplePage]);

  useEffect(() => {
    // Handle initial route
    handleRoute();
    
    // Listen for back/forward
    window.addEventListener("popstate", handleRoute);
    window.addEventListener("hashchange", handleRoute);
    
    return () => {
      window.removeEventListener("popstate", handleRoute);
      window.removeEventListener("hashchange", handleRoute);
    };
  }, [handleRoute]);
}
