import Backbone from 'backbone';
import settings from '../settings';
import router from '../router';
import User from './user';

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
  },
  parse: function(response){
    if (response) {
      return {
        username: response.username,
        userId: response._id,
        authtoken: response._kmd.authtoken
      };
    }
  },
  login: function(username, password) {
    this.save({
      'username': username,
      'password': password
    },{
      success: (model, response) => {
          this.unset('password');
          window.localStorage.setItem('authtoken', response._kmd.authtoken);
          router.navigate( `user/ ${model.get('userId')} `, {trigger:true} );
          console.log(model, '<=== session: model');
      },
      error: function() {
          console.log('ERROR!');
        }
      });
    },
    retrieve: function(){
      this.fetch({
        url: `https://baas.kinvey.com/user/${settings.appKey}/_me`
      });
    }
});

let session = new Session();

export default session;
