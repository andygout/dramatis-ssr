export default (...args) => args.filter(arg => typeof arg !== 'object').join('');
