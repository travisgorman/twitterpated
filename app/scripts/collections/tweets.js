import Backbone from 'backbone';

import Tweet from '../models/tweet';
import settings from '../settings';

const Tweets = Backbone.Collection.extend({
  comparator: function(model){
    return model.get('timestamp');
  },
  model: Tweet,
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/tweets`
});

let tweetsCollection = new Tweets();

export default tweetsCollection;
