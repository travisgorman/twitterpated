import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import session from '../models/session';
import EditView from './editView';
const TweetView = Backbone.View.extend({
    tagName: 'li',
    className: 'tweetLi',
    events: {
        'click .delete'   : 'deleteFunction',
        'submit #edit'    : 'editFunction',
        'click .userLink' : 'routeProfileFunction'
    },
    deleteFunction: function(evt) {
        evt.preventDefault();
        this.model.destroy();
    },
    editFunction: function(evt) {
        evt.preventDefault();
        console.log(evt)
      this.save({

      })
    },
    routeProfileFunction: function(evt) {
        evt.preventDefault();
        router.navigate(`user/${this.model.get('author')}`, {
            trigger: true
        });
    },
    template: function() {
        if (session.get('username') !== this.model.get('author')) {
            return `
        <section class="tweet-user-info">
          <h5 class="userLink">
              @${this.model.get('username')}
          </h5>
        </section>
        <main>
          <p class="tweet">
            ${this.model.get('body')}
          </p>
          <p class="timestamp">
            ${this.model.get('timestamp')}
          </p>
        </main>
      `;
        } else {
            return `
        <section class="tweet-user-info">
          <h5 class="userLink">
            @${this.model.get('username')}
          </h5>
          <ul class="edit-btns">
            <li>
              <input id="edit"
                type="submit"
                class="edit"
                value="edit" />
            </li>
            <li>
              <button class="delete">
                Delete
              </button>
            </li>
          </ul>
        </section>
        <main>
          <p class="tweet">
            ${this.model.get('body')}
          </p>
          <p class="timestamp">
            ${this.model.get('timestamp')}
          </p>
        </main>
      `;
        }
    },
    render: function() {
        this.$el.html(this.template());
    }
});

export default TweetView;
