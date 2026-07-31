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
              title: 'Privacy & Cookies Notice 🍪',
              description: 'We use cookies to enhance your browsing experience and analyze site traffic anonymously.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject optional',
              showPreferencesBtn: 'How we use cookies'
            },
            preferencesModal: {
              title: "Manage Cookie Preferences",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject Non-Essential",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Cookie Usage Overview",
                  description: "We use cookies to ensure basic website functionality and analyze anonymous site traffic to improve user experience."
                },
                {
                  title: "Strictly Necessary Cookies",
                  description: "Essential cookies required for website security, page navigation, and basic core operations. These cannot be disabled.",
                  category: "necessary"
                },
                {
                  title: "Performance & Analytics Cookies",
                  description: "Optional Google Analytics cookies that help us measure site traffic and visitor interactions anonymously.",
                  category: "analytics"
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
