import $ from 'jquery';
import Backbone from 'backbone';

import settings from '../settings';
import userCollection from '../collections/Users';
import tweetsCollection from '../collections/Tweets';

import session from '../models/session';
// import User from '../models/user';

const ProfileView = Backbone.View.extend({
  initialize: function(id){
    if (!userCollection._id){
        userCollection.add({'_id':id
        });
      }
      this.model = userCollection.get(id);
      console.log(userCollection.get(id));
      this.model.fetch();
      this.model.on('change', () =>{
        this.render();
      });

      // userCollection.fetch({
      //   url: `https://baas.kinvey.com/user/${settings.appKey}/?query={"username":"${username}"}`,
      //   success: (response) =>{
      //     this.model = response.models[0];
      //     tweetsCollection.on('add', () => {
      //       this.render();
      //     });
      //   }
      // });

      // tweetsCollection.fetch({
      //   url: `https://baas.kinvey.com/user/${settings.appKey}/?query={"username":"${username}"}`,
      //   success: (response) =>{
      //     this.model = response.models[0];
      //     tweetsCollection.on('add', () => {
      //       this.render();
      //     });
      //   }
      // });
  },
  tagName: 'div',
  className: 'profile',
  events: {},
  template: () => {
    console.log(currentModel);
    return `
      <div id="short-bio">
        <h2>${this.model.get('firstname')} ${this.model.get('lastname')}</h2>
        <h4>@${this.model.get('username')}</h2>
        <p>a little quote I wrote</p>
        <data>birthday ${this.model.get('birthdayMonth')} ${this.model.get('birthdayDay')}, ${this.model.get('birthdayYear')}</data>
      </div>
      <nav class="nav-profile">
        <ul>
          <li class="li1">tweets</li>
          <li class="li2">following</li>
          <li class="li3">followers</li>
          <li class="li4">likes</li>
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
