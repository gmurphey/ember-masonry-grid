import ENV from '../config/environment';

export function initialize(appInstance) {
  const config = ENV['ember-masonry-grid'] || {};
  appInstance.register('config:masonry-config', config, { instantiate: false });
  appInstance.inject('service:masonry-config', 'config', 'config:masonry-config');
}

export default {
  name: 'masonry-config',
  initialize
};
