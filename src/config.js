/** Shared site config. Values sourced from env so nothing broken ever ships. */

export const CONTACT_EMAIL = 'azmolhudanahid@gmail.com'

/**
 * Opens a Gmail compose window in a new browser tab. `mailto:` links only work
 * when the visitor has a desktop mail client wired up — most don't — so social
 * icons point here instead and behave like the GitHub / LinkedIn links.
 */
export const MAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`

export const PHONE = '+880 1757-853828'
export const LOCATION = 'Dhaka, Bangladesh'

export const GITHUB_URL = 'https://github.com/nahid864'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/azmol-huda-nahid/'

/** Public URL of the site, used for canonical + Open Graph tags. */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://nahid864.github.io/Azmol-Huda-Nahid/'

/**
 * Résumé download. Drop a PDF in `public/assets/` and set VITE_RESUME_URL to
 * its filename (e.g. "Azmol-Huda-Nahid-CV.pdf"). The download button only
 * renders once this is set, so a missing file can never 404 on visitors.
 */
/* Fallback filename so the button also renders on the deployed site, where
   .env is gitignored and never reaches the CI build. Override it via .env. */
const resumeFile = import.meta.env.VITE_RESUME_URL || 'Azmol_Huda_Nahid_CV_soft.pdf'
export const RESUME_URL = resumeFile
  ? `${import.meta.env.BASE_URL}assets/${resumeFile}`
  : ''

/**
 * Blog home (Medium, Dev.to, Hashnode, your own…). Until this is set the
 * articles render as clearly-labelled upcoming topics rather than as links
 * that go nowhere — a dead "Read more" costs more trust than an empty section.
 */
export const BLOG_URL = import.meta.env.VITE_BLOG_URL || ''
