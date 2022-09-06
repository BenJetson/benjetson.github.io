/**
 * The TIER indicates Environment that the app is deployed and running on.
 * Can be one of `production`, `preview`, or `development`.
 */
export const TIER = process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development";

/**
 * The GIT_HASH indicates the first seven characters of the most recent
 * commit's SHA hash in Git, which this build was created upon.
 */
export const GIT_HASH = (
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "unknown"
).substring(0, 7);

/**
 * The RECAPTCHA_SITE_KEY is a public key that is provided to the ReCAPTCHA
 * web service when making verification requests.
 */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * The CONTACT_FORM_ID is the FormSpree form identifier for the contact page.
 */
export const CONTACT_FORM_ID = process.env.NEXT_PUBLIC_CONTACT_FORM_ID;
