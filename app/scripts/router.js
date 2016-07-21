import $ from 'jquery';
import Backbone from 'backbone';

import renderTweetForm from './views/tweet-form';
import LoginView from './views/loginView';
import $signup from './views/signup';
import tweetsView from './views/tweetsView';
import user from './models/session';
import tweets from './collections/tweets';
import settings from './settings';

// const Router = _.extend(Backbone.Router, {})
const Router = Backbone.Router.extend({
  initialize: function() {
    this.on('route', function() {
      this.oldViews.forEach(function(view) {
        view.destroy();
      });
      this.currentViews.forEach(function(view) {
        this.oldViews.push(view)
        this.currentViews.unshift();
      })
    })
  },
  currentViews: [],
  oldViews: [],
  // key in the routes object is the path of the url
  // value is a string that is the name of the function to call when we go to that route.
  routes: {
    login       : 'loginFunction',
    signup      : 'signupFunction',
    logout      : 'logoutFunction',
    tweets       : 'tweetsFunction',
    'tweets/new': 'newTweetFunction',
    'tweets/:id' : 'tweetFunction',
    '/*'        : 'loginFunction'
  },
  loginFunction: function() {
    let login = new LoginView();

    login.render();
    $('.container').empty().append(login.$el);
  },
  signupFunction: function() {
    $('.container').empty().append($signup);
  },
  logoutFunction: function() {
    user.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
      success: () => {
        user.clear();
        this.navigate('login', {trigger: true});
      }
    });
  },
  tweetsFunction: function() {
    console.log('tweets route');
    let tweetsView = new tweetsView();
    $( '.container' ).empty().append( $nav ).append( tweetsView.render().$el );
  },
  tweetFunction: function(id) {
    tweets.off();
    let tweetDetailView = new tweetDetailView(id);
    let tweetsView = new tweetsView();
    $('.container').empty()
      .append($nav)
      .append(tweetsView.render().$el)
      .append(tweetDetailView.render().$el);
  },
  newTweetFunction: function() {
    // console.log(user);
    if (!user.get( 'username' )) {
      if (localStorage.getItem( 'authtoken' )) {
        user.retrieve();
      } else {
        router.navigate( 'login', {trigger: true});
      }
    } else {
      var $newTweet = renderTweetForm();
      $('.container').empty().append( $nav ).append( $newTweet );
    }
  }
});

const router = new Router();

export default router;
