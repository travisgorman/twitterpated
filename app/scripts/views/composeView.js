import $ from 'jquery';
import tweets from '../collections/tweets';
import router from '../router';
import user from '../models/session';

function tweetForm() {

    let $newTweet = $(`
    <div class="tweet-form">
      <h2>'Compose a tweet'</h2>
      <form>
        <textarea name="body" placeholder="put your tweet in here"></textarea>
        <input type="submit" name="submit" value="submit">
      </form>
    </div>
  `);

    $newTweet.find( 'input[type="submit"]')
        .on( 'click', function( evt ) {
            evt.preventDefault();
            tweets.create({
                author: user.username,
                body: $( 'textarea' ).val()
            },
            {
                success: function( response ) {
                    router.navigate( 'tweets', {trigger: true} );
                },
                error: function() {}
            });
    });

    return $newTweet;
}
export default tweetForm;
