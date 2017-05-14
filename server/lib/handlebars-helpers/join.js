export default (array, property) => array.map(item => item[property]).join(' / ');
