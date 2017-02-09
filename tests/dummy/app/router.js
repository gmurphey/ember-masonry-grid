import Ember from 'ember';
import config from './config/environment';

const {
    Router
} = Ember;

const EmberRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

EmberRouter.map(function() {
});

export default EmberRouter;
