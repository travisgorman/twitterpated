import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import settings from '../settings';
import session from '../models/session';

const LogoutView = Backbone.View.extend({
    tagName: 'div',
    className: 'logout',
    events: {
        'click .logout-btn': 'logoutFunction'
    },
    logoutFunction: function(evt) {
        evt.preventDefault();
        session.save(null, {
            url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
            success: function(model, response) {
                model.unset('password');
                localStorage.removeItem('authtoken');
                router.navigate('login', {trigger:true});
                console.log('User logged out!');
            }});
    },
    error: function() {
        console.log('ERROR! User failed to signup! See logoutView.js');
    },
    template: function() {
            return `
              <button class="logout-btn">Logout</button>
              `;
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        }
});

export default LogoutView;
