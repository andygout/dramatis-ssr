import modelNamingProp from './model-naming-prop';

export default instance => instance[modelNamingProp(instance.model)];
