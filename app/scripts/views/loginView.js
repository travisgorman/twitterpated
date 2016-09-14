import $ from 'jquery';
import Backbone from 'backbone';
import router from '../router';
import settings from '../settings';
import session from '../models/session';
import SignupView from './signupView';

const LoginView = Backbone.View.extend({
    tagName: 'div',
    className: 'login-form',
    events: {
        'click #login-btn': 'submitFunction',
        'click #signup-btn': 'signupFunction'
    },
    submitFunction: function (evt) {
        evt.preventDefault();
        let username = this.$('#username').val();
        let password = this.$('#password').val();
        session.login(username, password);
    },
    signupFunction: function(){
      let signup = new SignupView();
      signup.render();
      $('.register').empty().append(signup.$el);
      router.navigate('login/signup', {trigger:true});
    },
    template: function() {
        return `
      <form class="login-modal">
        <h1>Twitterpated</h1>
        <h3>Log in to your account</h3>
        <input id="username" type="text" name="username" placeholder="username" />
        <input id="password" type="password" name="password" placeholder="password" />
        <input id="login-btn" type="submit" name="submit" placeholder="Log in" />
        <section class="register">
            <h3>Not Registered? Sign Up</h3>
            <button id="signup-btn" type="button" name="signup-btn">Sign Up</button>
        </section>
      </form>
      `;
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

export default LoginView;
