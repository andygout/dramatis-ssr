import pluralise from './pluralise';

export default instance => `/${pluralise(instance.model)}/${instance.uuid}`;
