import $ from 'jquery';
import Backbone from 'backbone';
import tweetcollection from '../collections/Tweets';
import Tweet from '../models/tweet';
import TweetView from './tweetView';

const FeedView = Backbone.View.extend({
  initialize: function(){
    tweetcollection.on('add', () => {
      this.render();
    });
    tweetcollection.on('remove', () => {
      this.render();
    });
    tweetcollection.fetch();
  },
  tagName: 'div',
  className: 'tweets-feed',
  template: function(){
    return `
      <h2>Golly Look at all these Tweets</h2>
      <ul class="ul-feed"> </ul>
    `;
  },
  render: function(){
    this.$el.html(this.template());
    tweetcollection.forEach((tweet) => {
      var tweetItem = new TweetView({
        model: tweet
      });
      tweetItem.render();
      this.$('.ul-feed').append(tweetItem.$el);
  });
    return this;
  }
});
export default FeedView;
// <input
//   data-id="${tweet.get('_id')}"
//   type="button"
//   class="editbumbl"
//   value="EDIT">
// <input
//   data-id="${tweet.get('_id')}"
//   type="button"
//   class="deleteTweet"
//   value="DELETE">
