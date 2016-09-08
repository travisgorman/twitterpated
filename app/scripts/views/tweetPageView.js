import Backbone from 'backbone';
import TweetPost from './tweetPost';
// import TweetView from './tweetView';
import FeedView from './feedView';

const TweetPageView = Backbone.View.extend({
  className: 'tweetPageView',
  render: function(){
    let tweetPost =  new TweetPost();
    tweetPost.render();
    let feedView =  new FeedView();
    feedView.render();
    this.$el.append([tweetPost.$el, feedView.$el,]);
    return this;
  }
});

export default TweetPageView;
