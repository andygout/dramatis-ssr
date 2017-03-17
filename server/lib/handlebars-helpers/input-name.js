import capitalise from '../capitalise';

export default (instance, namingValue) => instance ? `${instance.model}${capitalise(namingValue)}` : namingValue;
