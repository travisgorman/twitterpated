import Backbone from 'backbone';
import settings from '../settings';

const tweet = Backbone.Model.extend({

  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${ settings.appId }/tweets`,
  defaults: {
    author: '',
    timestamp: new Date(),
    body: ''
  }

});

window.tweet = tweet;

export default tweet;
