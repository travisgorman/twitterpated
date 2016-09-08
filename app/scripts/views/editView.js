import $ from 'jquery';
import Backbone from 'backbone';

import tweetCollection from '../collections/Tweets';
import session from '../models/session';

const EditView = Backbone.View.extend({
  tagName: 'form',
  className: 'tweetPost',
  events: {
    'click .edit-btn': 'editTweetFunction'
  },
  editTweetFunction: function(evt) {
    tweetCollection.save({
      body : this.$('input[name="tweet-field"]').val()
    },{
      success: () => {
        this.$('input[name="tweet"]').val('');
      }
    });
  },
  template: function(){
    return `
        <input type="text" name="tweet-field" placeholder="tweet out" maxlength="140" />
        <button class="edit-btn">edit</button>
    `;
  },
  render: function(){
      this.$el.html(this.template());
      return this;
  }
});

export default EditView;
