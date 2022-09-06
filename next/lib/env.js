const lookupNextEnv = (name) => process.env["NEXT_PUBLIC_" + name];

/**
 * The TIER indicates Environment that the app is deployed and running on.
 * Can be one of `production`, `preview`, or `development`.
 */
export const TIER = lookupNextEnv("VERCEL_ENV") ?? "development";

/**
 * The GIT_HASH indicates the SHA hash of the most recent commit in Git, which
 * this build was created upon.
 */
export const GIT_HASH = lookupNextEnv("VERCEL_GIT_COMMIT_SHA") ?? "unknown";

/**
 * The RECAPTCHA_SITE_KEY is a public key that is provided to the ReCAPTCHA
 * web service when making verification requests.
 */
export const RECAPTCHA_SITE_KEY = lookupNextEnv("RECAPTCHA_SITE_KEY");

/**
 * The CONTACT_FORM_ID is the FormSpree form identifier for the contact page.
 */
export const CONTACT_FORM_ID = lookupNextEnv("CONTACT_FORM_ID");
