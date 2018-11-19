/** Concatenates an array of strings separated by some weird chars.
 *
 * It is used for perfoming seaches in several fields of an object.
 * Joining these strings by strange chars, avoids searches to return
 * false positives as result of a word created by the end of a string
 * and the beggining of the next.
 *
 * @param {string[]} strings - An array of strings
 * @returns {string}
 */
export const concatenateForSearch = strings => strings.join("¥†").toLowerCase();
