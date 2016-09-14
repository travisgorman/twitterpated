import $ from 'jquery'
import Backbone from 'backbone'
import settings from './settings'
import tweetsCollection from './collections/Tweets'
import session from './models/session'
import LoginView from './views/loginView'
import LogoutView from './views/logoutView'
import ProfileView from './views/profileView'
import TweetPageView from './views/tweetPageView'
import SignupView from './views/signupView'
import FeedView from './views/feedView'
import TweetView from './views/tweetView'
import TweetPost from './views/tweetPost'
import EditView from './views/editView'

const Router = Backbone.Router.extend({
  routes : {
    '/*'             :  'loginFunction',
    'login'          :  'loginFunction',
    'login/signup'   :  'signupFunction',
    'logout'         :  'logoutFunction',
    'user/:id'       :  'profileFunction'
  },
  loginFunction : function(){
    tweetsCollection.off();
    let login = new LoginView();
    login.render();
    $('.container').empty().append(login.$el);
  },
  signupFunction : function(){
    router.navigate('login/signup', {trigger:true});
  },
  logoutFunction : function(){
    tweetsCollection.off();
    router.navigate('login', {trigger: true});
  },
  profileFunction : function(id){
    tweetsCollection.off();
    let logout = new LogoutView();
    let profile = new ProfileView(id);
    let tweetPageView = new TweetPageView();
    $('.container').empty()
                   .append(logout.render().$el)
                   .append(profile.$el)
                   .append(tweetPageView.render().$el);

  },
  editFunction: function () {
    $.ajax({
      url: `https://baas.kinvey.com/`
    })
  }
});

const router = new Router();

export default router;
