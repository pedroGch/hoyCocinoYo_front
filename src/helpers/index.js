/**
 * Función que capitaliza la primera letra de una cadena de texto
 * @param {string} str 
 * @returns {string}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalize };

export default {
  capitalize,
};
