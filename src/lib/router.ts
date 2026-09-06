"use client";

import { useEffect, useCallback } from "react";
import { useApp } from "@/lib/store";

/**
 * Path-based router — makes the SPA feel like real separate pages.
 * 
 * Routes:
 * /                                     → Homepage
 * /projects                             → Projects listing page
 * /projects/[slug]                      → Project detail page
 * /blog                                 → Blog listing page
 * /blog/[slug]                          → Blog post page
 * /temples                              → Temples listing page
 * /temples/[slug]                       → Temple detail page
 * /plots                                → Plots listing page
 * /about                                → About page
 * /invest                               → Invest/EMI page
 * /contact                              → Contact page
 * /admin                                → Admin panel
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

/** Parse the current URL pathname into a Route */
export function parsePath(): Route {
  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter(Boolean);

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

/**
 * @deprecated Use parsePath() instead.
 * Kept for backward compatibility — delegates to parsePath().
 */
export function parseHash(): Route {
  return parsePath();
}

/** Convert a Route to a URL path string (e.g. /projects/my-slug) */
export function routeToPath(route: Route): string {
  switch (route.name) {
    case "home": return "/";
    case "admin": return "/admin";
    case "projects": return "/projects";
    case "project": return `/projects/${route.slug}`;
    case "blog": return "/blog";
    case "blog-post": return `/blog/${route.slug}`;
    case "temples": return "/temples";
    case "temple": return `/temples/${route.slug}`;
    case "plots": return "/plots";
    case "about": return "/about";
    case "invest": return "/invest";
    case "contact": return "/contact";
  }
}

/**
 * @deprecated Use routeToPath() instead.
 * Kept for backward compatibility — returns the path without the # prefix.
 */
export function routeToHash(route: Route): string {
  return routeToPath(route);
}

/** Navigate to a route — updates URL via pushState and store */
export function navigate(route: Route) {
  const path = routeToPath(route);
  if (window.location.pathname !== path) {
    window.history.pushState(null, "", path);
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
  
  // Dispatch popstate so the router hook picks up the change
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" });
}

/** Hook that listens to popstate events for path-based routing */
export function usePathRouter() {
  const {
    setView, openProjectPage, closeProjectPage,
    openBlogPage, closeBlogPage,
    openTemplePage, closeTemplePage,
  } = useApp();

  const handleRoute = useCallback(() => {
    const route = parsePath();

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
    
    // Listen for back/forward and programmatic navigation
    window.addEventListener("popstate", handleRoute);
    
    return () => {
      window.removeEventListener("popstate", handleRoute);
    };
  }, [handleRoute]);
}

/**
 * @deprecated Use usePathRouter() instead.
 * Kept for backward compatibility — delegates to usePathRouter().
 */
export function useHashRouter() {
  usePathRouter();
}
