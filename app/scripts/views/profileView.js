import $ from 'jquery';
import Backbone from 'backbone';
import settings from '../settings';
import userCollection from '../collections/Users';
import tweetsCollection from '../collections/Tweets';
import session from '../models/session';

const ProfileView = Backbone.View.extend({
  initialize: function(id){
    if (!userCollection._id){
        userCollection.add({
          '_id': id
        });
      }
      this.model = userCollection.get(id);
      console.log(userCollection.get(id));
      this.model.fetch();
      this.model.on('change', () => {
        this.render();
      });
  },
  tagName: 'div',
  className: 'profile',
  events: {},
  template: () => {
    return `
      <div id="short-bio">
        <h2>
          ${this.model.get('firstname')} ${this.model.get('lastname')}
        </h2>
        <h4>
          @${this.model.get('username')}
        </h2>
        <p>
          a little quote I wrote
        </p>
        <data>
          birthday
          ${this.model.get('birthdayMonth')}
          ${this.model.get('birthdayDay')},
          ${this.model.get('birthdayYear')}
        </data>
      </div>
      <nav class="nav-profile">
        <ul>
          <li> tweets </li>
          <li> following </li>
          <li> followers </li>
          <li> likes </li>
        </ul>
      </nav>
      `;
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

export default ProfileView;
