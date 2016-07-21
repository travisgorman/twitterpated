import Backbone from 'backbone';
import tweetView from './tweetView';
import tweets from '../collections/tweets';

const tweetsView = Backbone.View.extend({

  initialize: function() {
      console.log( this );
      tweets.on( 'add', () => {
        console.log( this.cid, 'i heard you added a model' );
        this.render();
      });
      tweets.fetch();
  },

  className: 'tweets-list',

  template: function() {
    return `

    <h2>tweets</h2>
    <ul></ul>

    `;
  },

  render: function() {

    this.$el.html( this.template() );
    tweets.forEach( tweet => {
      var tweetView = new tweetView({
        model: tweet
      });

      tweetView.render();
      this.$( 'ul' ).append( tweetView.$el );
    });
    return this;
  }
});

export default tweetsView;
