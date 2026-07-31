/**
 * Vanilla CookieConsent v3 + Google Consent Mode v2 Integration
 */
window.addEventListener('load', function() {
  function handleConsentUpdate() {
    const analyticsAccepted = typeof CookieConsent !== 'undefined' && CookieConsent.acceptedCategory && CookieConsent.acceptedCategory('analytics');
    
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': analyticsAccepted ? 'granted' : 'denied'
      });
    }

    // Auto-scrub non-essential cookies if rejected
    if (!analyticsAccepted) {
      const cookies = document.cookie.split(';');
      const domain = window.location.hostname;
      const rootDomain = domain.split('.').slice(-2).join('.');

      cookies.forEach(c => {
        const name = c.split('=')[0].trim();
        if (name.startsWith('_ga') || name.startsWith('_gid')) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
        }
      });
    }
  }

  if (typeof CookieConsent !== 'undefined') {
    CookieConsent.run({
      autoClearCookies: true,
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'left',
          equalWeightButtons: true,
          flipButtons: false
        }
      },
      categories: {
        necessary: { readOnly: true },
        analytics: {
          autoClear: {
            cookies: [{ name: /^(_ga|_gid|_gat|_ga_.*)/ }]
          }
        }
      },
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We value your privacy 🍪',
              description: 'Grounded Dating uses essential cookies to ensure site functionality and optional analytical cookies to measure visitor interactions. We never sell your data or use advertising trackers.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject optional',
              showPreferencesBtn: 'How we use cookies'
            },
            preferencesModal: {
              title: 'How We Use Cookies',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject optional',
              sections: [
                {
                  title: 'Cookie Usage Overview',
                  description: 'Grounded Dating is committed to transparency. We use strictly necessary cookies for core operations and optional analytics to measure site traffic.'
                },
                {
                  title: 'Strictly Necessary Cookies',
                  description: 'Essential cookies required for security, login sessions, and site navigation.',
                  category: 'necessary'
                },
                {
                  title: 'Analytics Cookies',
                  description: 'Optional Google Analytics cookies that help us understand how users interact with our site.',
                  category: 'analytics'
                }
              ]
            }
          }
        }
      },
      onAccept: handleConsentUpdate,
      onChange: handleConsentUpdate
    });
  }

  // Bind floating cookie button strictly to open the "We value your privacy" modal
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.cookie-floating-btn') || e.target.closest('[data-cc="show-preferencesModal"]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof CookieConsent !== 'undefined' && typeof CookieConsent.show === 'function') {
        CookieConsent.show(true);
      }
    }
  }, true);
});
