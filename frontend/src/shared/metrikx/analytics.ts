// src/utils/analytics.ts
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Замени на свои ID
const YM_ID = 98765432;
const GA4_ID = 'G-XXXXXXXXXX';
const FB_PIXEL_ID = '1234567890';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    // Яндекс.Метрика
    if (typeof (window as any).ym !== 'undefined') {
      (window as any).ym(YM_ID, 'hit', path);
    }

    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
      });
    }

    // Facebook Pixel
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'PageView');
    }

    // VK Pixel
    if (typeof (window as any).VK !== 'undefined') {
      (window as any).VK.Retargeting.Hit();
    }

    // TikTok
    if (typeof (window as any).ttq !== 'undefined') {
      (window as any).ttq.page();
    }

    // Roistat
    if (typeof (window as any).roistat !== 'undefined') {
      (window as any).roistat.visit.sendPageView();
    }

  }, [location.pathname, location.search]); // срабатывает при любом navigate()
};