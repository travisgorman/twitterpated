import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import settings from '../settings';
import User from '../models/user';
import session from '../models/session';
import loginView from './loginView';

const SignupView = Backbone.View.extend({
    tagName: 'form',
    className: 'signup-form',
    events: {
        'click #signup-btn' : 'signupFunction',
        'click .cancel-btn' : 'cancelFunction'
    },
    signupFunction: function(evt) {
        evt.preventDefault();
        $('.login-modal').addClass('signup-view');
        localStorage.removeItem('authtoken');
        let username = this.$('input[name="username"]').val();
        let password = this.$('input[name="password"]').val();
        let password2 = this.$('input[name="password2"]').val();
        if (password !== password2){
          console.log('your passwords don\'t match!');
        } else {
          session.save({
            username: username,
            password: password
        }, {
            url: `https://baas.kinvey.com/user/${settings.appKey}`,
            success: function(model, response) {
              console.log('model ', model);
              console.log('response ', response);
                model.unset('password');
                window.localStorage.setItem('authtoken', response._kmd.authtoken);
                router.navigate(`user/${response._id}`, {trigger:true});
                $('input[name="username"]').val('');
                $('input[name="password"]').val('');
                $('input[name="password2"]').val('');
            },
            error: function() {
                console.log('ERROR! User failed to signup! See signupView.js');
            }});
          }
    },
    cancelFunction: function(){
      $('.register').empty();
      router.navigate('login', {trigger:true});
    },
    template: function() {
        return `
          <h3>Sign Up</h3>
            <input
              type="text"
              name="username"
              placeholder="username" />
            <input
              type="password"
              name="password"
              placeholder="password" />
            <input
              type="password"
              name="password2"
              placeholder="confirm password" />
            <input
              id="signup-btn"
              type="submit"
              name="sign up"
              placeholder="sign up" />
            <input
              class="cancel-btn"
              type="button"
              name="cancel"
              value="cancel" />
          `;
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

export default SignupView;
