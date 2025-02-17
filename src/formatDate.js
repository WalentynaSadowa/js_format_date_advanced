'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const resultParts = toFormat.map((format) => {
    if (format === 'YYYY') {
      const yy = dateMap['YY'];

      if (yy) {
        return (parseInt(yy) < 30 ? '20' : '19') + yy;
      }

      return dateMap['YYYY'];
    }

    if (format === 'YY') {
      const yyyy = dateMap['YYYY'];

      if (yyyy) {
        return yyyy.slice(-2);
      }

      return dateMap['YY'];
    }

    return dateMap[format];
  });

  const formattedDate = resultParts.join(toFormat[toFormat.length - 1]);

  return formattedDate.replace(/([^\d\s])$/, '');
}

module.exports = formatDate;
