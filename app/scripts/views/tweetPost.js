import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import tweetCollection from '../collections/Tweets';
import session from '../models/session';

const TweetPost = Backbone.View.extend({
  tagName: 'form',
  className: 'tweetPost',
  events: {
    'click .post-btn': 'postTweetFunction',
    'keyup input[name="tweet-field"]': 'keyAction',
  },
  keyAction: function(evt){
    evt.preventDefault();
    if (evt === 13) {
      tweetCollection.create({
        author: session.get('username'),
        body : this.$('input[name="tweet-field"]').val()
      },{
        success: () => {
          this.$('input[name="tweet-field"]').val('');
        }
      });
    }
  },
  postTweetFunction: function(evt) {
    evt.preventDefault();
    tweetCollection.create({
      username: session.get('username'),
      author: session.get('username'),
      body : this.$('input[name="tweet-field"]').val()
    },{
      success: () => {
        this.$('input[name="tweet-field"]').val('');
      }
    });
  },
  template: function(){
    return `
        <input type="text" name="tweet-field" placeholder="tweet out" maxlength="140" />
        <button class="post-btn">submit</button>
    `;
  },
  render: function(){
      this.$el.html(this.template());
      return this;
  }
});

export default TweetPost;
