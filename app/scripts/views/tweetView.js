import Backbone from 'backbone';
import tweets from '../collections/tweets';

const tweetView = Backbone.View.extend({

  initialize: function( tweetId ) {
    this.model = tweets.get( tweetId );
    this.model.on('change', ( model ) => {
      this.render();
    });
  },

  tagName: 'article',
  className: 'tweet-detail',

  template: function() {
    return `

      <h2>${ this.model.get( 'title' ) }</h2>
      <div class="tweet-meta-data">
        <span class="article-author">${ this.model.get( 'author' ) }</span>
        <time class="article-timestamp">${ this.model.get( 'timestamp' ) }</time>
      </div>
      <p>
        ${ this.model.get( 'body' ) }
      </p>

    `;
  },
  render: function() {
    this.$el.html( this.template() );
    return this;
  }
});

export default tweetView;
