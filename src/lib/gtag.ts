declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = "AW-18433321537";

// Page view track karne ke liye
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, { page_path: url });
  }
};

// Conversion event track karne ke liye
export const trackConversion = (
  event: string,
  params: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
};
