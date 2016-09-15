import Backbone from 'backbone'
import $ from 'jquery'
import tweets from '../collections/Tweets'

const editTweet = Backbone.View.extend({
  initialize: function(id){
    this.model = tweets.get(id);
    console.log(this.model)
  },
  tagName: 'form',
  className: 'editTweet',
  events: {
    'keydown input' : 'editTweetFunction'
  },
  editTweetFunction: (evt) => {
    if (evt.which === 13) {
      this.model.save(
        {
          body: $('input').val()
        }, {
          success: (model, response) => {
            console.log( model, response);
          },
          error: function () {
            console.log('NOPE')
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
