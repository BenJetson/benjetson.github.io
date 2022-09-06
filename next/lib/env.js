const lookupNextEnv = (name) => process.env["NEXT_PUBLIC_" + name];

const VERCEL_ENV = lookupNextEnv("VERCEL_ENV") ?? "development";
const VERCEL_URL = lookupNextEnv("VERCEL_URL");

const TIER_PROD = "prod";
const TIER_QA = "qa";
const TIER_PREVIEW = "preview";
const TIER_DEV = "dev";

const TIER_BY_VERCEL_URL = {
  "benjetson.vercel.app": TIER_PROD,
  "qa.benjetson.vercel.app": TIER_QA,
};

/**
 * The TIER indicates Environment that the app is deployed and running on.
 */
export const TIER = (() => {
  let out = TIER_DEV;

  switch (VERCEL_ENV) {
    case "production":
      out = TIER_BY_VERCEL_URL[VERCEL_URL];
      if (!out) throw new Error(`no known tier for URL '${VERCEL_URL}'`);
      break;

    case "preview":
      out = TIER_PREVIEW;
      break;
  }

  return out;
})();

/**
 * The GIT_HASH indicates the SHA hash of the most recent commit in Git, which
 * this build was created upon.
 */
export const GIT_HASH = !lookupNextEnv("VERCEL_GIT_COMMIT_SHA")
  ? "unknown"
  : lookupNextEnv("VERCEL_GIT_COMMIT_SHA");

/**
 * The RECAPTCHA_SITE_KEY is a public key that is provided to the ReCAPTCHA
 * web service when making verification requests.
 */
export const RECAPTCHA_SITE_KEY = lookupNextEnv("RECAPTCHA_SITE_KEY");

/**
 * The CONTACT_FORM_ID is the FormSpree form identifier for the contact page.
 */
export const CONTACT_FORM_ID = lookupNextEnv("CONTACT_FORM_ID");
