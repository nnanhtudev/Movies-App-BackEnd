const capitalizeFirstLetter = (inputString) => {
  return inputString
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const normalizeString = (str) => {
  if (str === undefined) {
    return;
  }
  return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
};





module.exports = { capitalizeFirstLetter, normalizeString }