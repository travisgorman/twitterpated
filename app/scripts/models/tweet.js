import Backbone from 'backbone';

import settings from '../settings';

const Tweet = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/tweets`,
  defaults: {
    username: '',
    timestamp: new Date(),
    body: '',
    author: ''
  }
});

export default Tweet;
