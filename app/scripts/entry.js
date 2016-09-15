import $ from 'jquery';
import Backbone from 'backbone';
import router from './router';
import settings from './settings';
import session from './models/session';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax){
  if (localStorage.getItem('authtoken')){
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
  } else {
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});

Backbone.history.start();

if (!localStorage.getItem('authtoken')) {
  router.navigate('login', {trigger: true});
} else {
  session.retrieve();
}

console.log(session);
