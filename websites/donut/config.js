/* ============================================
   SITE CONFIGURATION
   ============================================
   Client: Change ONLY the values below.
   Then deploy. That's it.
   ============================================ */

const SITE_CONFIG = {

    // ---- Company Info ----
    companyName: 'DONUTS',
    tagline: 'Handcrafted Bakery',
    phone: '+1 555 123 4567',
    email: 'hello@donuts.com',
    address: '123 Bakery Street, Sweet City, SC 12345',

    // ---- Social Links (leave blank to hide) ----
    social: {
        instagram: '#',
        facebook: '#',
        tiktok: '#'
    },

    // ---- SEO ----
    seo: {
        title: 'DONUTS | Handcrafted Bakery',
        description: 'Discover the joy of handcrafted donuts made with love and the finest ingredients. From classic flavors to bold creations — there\'s a treat for every mood.',
        canonicalUrl: 'https://www.donuts.com',
        ogImage: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
        locale: 'en_US'
    },

    // ---- Analytics (leave blank to disable) ----
    analytics: {
        gtmId: '',           // e.g. 'GTM-XXXXXXX'
        ga4Id: '',           // e.g. 'G-XXXXXXXXXX'
        fbPixelId: ''        // e.g. '1234567890'
    },

    // ---- Order Form ----
    // Set a Formspree/Getform URL to enable real submissions.
    formEndpoint: '',        // e.g. 'https://formspree.io/f/xyzabcde'

    // ---- Footer ----
    copyright: '2024 DONUTS. All Rights Reserved.'
};


/* ============================================
   DOM AUTO-POPULATION FROM CONFIG
   ============================================ */

function applySiteConfig() {
    const c = SITE_CONFIG;

    // Title tag
    document.title = c.seo.title;

    // Meta tags
    setMeta('description', c.seo.description);
    setMetaProperty('og:title', c.seo.title);
    setMetaProperty('og:description', c.seo.description);
    setMetaProperty('og:image', c.seo.ogImage);
    setMetaProperty('og:url', c.seo.canonicalUrl);
    setMetaProperty('og:site_name', c.companyName);
    setMetaProperty('og:locale', c.seo.locale);
    setMeta('twitter:title', c.seo.title);
    setMeta('twitter:description', c.seo.description);
    setMeta('twitter:image', c.seo.ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = c.seo.canonicalUrl;

    // JSON-LD structured data
    updateJsonLd(c);
}

function setMeta(name, content) {
    let el = document.querySelector('meta[name="' + name + '"]');
    if (el) el.setAttribute('content', content);
}

function setMetaProperty(property, content) {
    let el = document.querySelector('meta[property="' + property + '"]');
    if (el) el.setAttribute('content', content);
}

function updateJsonLd(c) {
    const existing = document.getElementById('jsonld-schema');
    if (existing) existing.remove();

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        name: c.companyName,
        description: c.seo.description,
        url: c.seo.canonicalUrl,
        telephone: c.phone,
        email: c.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: c.address
        },
        image: c.seo.ogImage,
        sameAs: Object.values(c.social).filter(u => u && u !== '#')
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}


/* ============================================
   ANALYTICS (fires ONLY after cookie consent)
   ============================================ */

let analyticsLoaded = false;

function initAnalytics() {
    if (analyticsLoaded) return;
    const a = SITE_CONFIG.analytics;
    if (!a.gtmId && !a.ga4Id && !a.fbPixelId) return;

    window.dataLayer = window.dataLayer || [];

    // GTM
    if (a.gtmId) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtm.js?id=' + a.gtmId;
        document.head.appendChild(s);
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    }
    // GA4 fallback (only if no GTM)
    else if (a.ga4Id) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + a.ga4Id;
        document.head.appendChild(s);
        window.dataLayer.push({ js: new Date() });
        window.dataLayer.push({ config: a.ga4Id });
        window.gtag = function () { window.dataLayer.push(arguments); };
    }

    // Facebook Pixel
    if (a.fbPixelId) {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
        n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', a.fbPixelId);
        fbq('track', 'PageView');
    }

    analyticsLoaded = true;
}

function trackEvent(eventName, params) {
    if (!analyticsLoaded) return;
    params = params || {};

    if (window.dataLayer) {
        window.dataLayer.push(Object.assign({ event: eventName }, params));
    }
    if (window.gtag) {
        window.gtag('event', eventName, params);
    }
    if (window.fbq) {
        fbq('trackCustom', eventName, params);
    }
}


/* ============================================
   INIT ON LOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    applySiteConfig();
});
