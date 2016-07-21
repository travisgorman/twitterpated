import Backbone from 'backbone';
import $ from 'jquery';

import session from '../models/session';
import router from '../router';

const LoginView = Backbone.View.extend({
  initialize: function() {
    // initialize anything?
  },

  tagName: 'form',
  className: 'login-form',
  id: 'login-form',
  events: {
    'submit': 'submitFunction'
  },

  submitFunction: function( e ) {
    let username = this.$( '#username' ).val();
    let password = this.$( '#password' ).val();

    e.preventDefault();

    session.login( username, password );
  },

  template: function() {
    return `

    <h2>Login</h2>
    <input id="username" type="text" name="username" placeholder="username"/>
    <input id="password" type="password" name="password" placeholder="password"/>
    <input type="submit" name="submit" value="submit">

    `;
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  }
});

export default LoginView;
// import LoginView from 'loginView';
