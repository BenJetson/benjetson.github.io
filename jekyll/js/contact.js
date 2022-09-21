/**
 * This file contains some helper functions for encoding and decoding the
 * contact form identifier.
 *
 * The purpose of this is to make it more difficult for spambots to submit
 * the contact form, since I believe a lot of them are unlikely to execute the
 * JavaScript on the page to do the decoding.
 *
 * Time will tell if this strategy is effective.
 * If it even reduces spam slightly that would be a plus.
 */

/**
 * encodeContactFormId takes a contact form ID and obfuscates it.
 *
 * @param {string} input the raw, unobfuscated form ID to obfuscate
 * @returns the obfuscated form ID string
 */
const encodeContactFormId = (input) => {
  let codePoints = [];
  for (const idx in input) codePoints.push(input.charCodeAt(idx));

  const data = JSON.stringify(codePoints);
  return btoa(data);
};

/**
 * decodeContactFormId takes an obfuscated contact form ID and reveals the
 * original/raw contact form ID.
 *
 * @param {string} input the obfuscated form ID
 * @returns the unobfuscated form ID
 */
const decodeContactFormId = (input) => {
  let decoded = atob(input);
  let data = JSON.parse(decoded);

  let result = "";
  for (const charCode of data) result += String.fromCharCode(charCode);

  return result;
};
