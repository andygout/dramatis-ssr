import instanceRoute from './instance-route';

export default instance => `<a href="${instanceRoute(instance)}">${instance.name}</a>`;
