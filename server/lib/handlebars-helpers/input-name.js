import capitalise from '../capitalise';

export default (instance, propertyName) => instance ? `${instance.model}${capitalise(propertyName)}` : propertyName;
