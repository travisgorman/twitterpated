import Backbone from 'backbone';
import tweet from '../models/tweet';
import settings from '../settings';

const tweets = Backbone.Collection.extend({

  comparator: function( model ) {
    return model.get( 'timestamp' );
  },
  model: tweet,
  url: `https://baas.kinvey.com/appdata/${ settings.appId }/tweets`
});

let tweets = new tweets();

export default tweets;
