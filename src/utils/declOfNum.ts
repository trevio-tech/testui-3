/**
 * Склонение числительных.
 * https://gist.github.com/realmyst/1262561
 *
 * @param n
 * @param title1
 * @param title2
 * @param title3
 * @returns {*}
 */
const declOfNum = (n, title1, title2, title3) => {
  return [title1, title2, title3][
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ]
};

export default declOfNum