import Backbone from 'backbone'
import $ from 'jquery'
import tweets from '../collections/Tweets'

const editTweet = Backbone.View.extend({
  initialize: function(id){
    this.model = tweets.get(id)
  },
  tagName: 'form',
  className: 'editTweet',
  events: {
    'keydown input' : 'editTweetFunction'
  },
  editTweetFunction: (evt) => {
    if (evt.which === 13) {
      this.model.save({
        // tweetCollection.save({
        body: $('input').val() }, {
          success: (response) => {
            console.log(response);
          }
        };
    }
  },
  template: function() {
    this. $el.html(this.template());
    return this;
  }
});

export default editTweet;
