import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import session from '../models/session';
import EditView from './editView';

const TweetView = Backbone.View.extend({
    tagName: 'li',
    className: 'tweetLi',
    events: {
        'click .delete': 'deleteFunction',
        'click .edit': 'editFunction',
        'click .userLink': 'routeProfileFunction'
    },
    deleteFunction: function(evt) {
        evt.preventDefault();
        this.model.destroy();
    },
    editFunction: function(evt) {
        evt.preventDefault();
        router.navigate('edit', {
            trigger: true
        });
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
          <h5 class="userLink">@${this.model.get('username')}</h5>
          <p>${this.model.get('author')}</p>
        </section>
        <main>
          <p class="tweet">${this.model.get('body')}</p>
          <p class="timestamp">${this.model.get('timestamp')}</p>
        </main>
      `;
        } else {
            return `
        <section class="tweet-user-info">
        <h5 class="userLink">@${this.model.get('username')}</h5>
        <p>${this.model.get('author')}</p>
          <ul class="edit-btns">
            <li><button class="edit">Edit</button></li>
            <li><button class="delete">Delete</button></li>
          </ul>
        </section>
        <main>
          <p class="tweet">${this.model.get('body')}</p>
          <p class="timestamp">${this.model.get('timestamp')}</p>
        </main>
      `;
        }
    },
    render: function() {
        this.$el.html(this.template());
    }
});

export default TweetView;
