import instanceNamingProp from './instance-naming-prop';

export default instance => instance[instanceNamingProp(instance.model)];
