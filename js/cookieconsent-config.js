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
              description: 'Grounded Dating uses essential cookies for site functionality and optional analytical cookies to measure site interactions. No marketing cookies or data selling.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject optional',
              showPreferencesBtn: 'Manage preferences'
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject optional',
              savePreferencesBtn: 'Save settings',
              sections: [
                {
                  title: 'Strictly Necessary Cookies',
                  description: 'These cookies are essential for the proper functioning of the website.',
                  category: 'necessary'
                },
                {
                  title: 'Analytics Cookies',
                  description: 'These cookies help us understand how visitors interact with Grounded Dating.',
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
});
