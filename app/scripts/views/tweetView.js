import $ from 'jquery';
import Backbone from 'backbone';
import router from '../router';
import session from '../models/session';
import EditView from './editView';
import settings from '../settings'

const TweetView = Backbone.View.extend({
    tagName: 'li',
    className: 'tweetItem',
    events: {
        'click .delete'   : 'deleteFunction',
        'click .edit'     : 'editFunction',
        'click .userLink' : 'routeProfileFunction'
    },
    deleteFunction: function(evt) {
        evt.preventDefault();
        this.model.destroy();
    },
    editFunction: function(evt) {
        evt.preventDefault();
        router.navigate('edit', {
            trigger: true
        });
    },
    routeProfileFunction: function(evt) {
        evt.preventDefault();
        router.navigate(`user/${this.model.get('author')}`, {
            trigger: true
        });
    },
    template: function() {
        if (session.get('username') !== this.model.get('author')) {
            return `
              <section class="tweet-user-info">
                  <h5 class="userLink">
                    @${this.model.get('username')}
                  </h5>
                  <p>
                    ${this.model.get('author')} said...
                  </p>
              </section>
              <main>
                  <p class="tweet">
                  ${this.model.get('body')}
                  </p>
                  <p class="timestamp">
                  ${this.model.get('timestamp')}
                  </p>
              </main>
            `;
        } else {
            return `
                <section class="tweet-user-info">
                <h5 class="userLink">
                    @${this.model.get('username')}
                </h5>
                <p>
                  ${this.model.get('author')}
                </p>
                  <ul class="edit-btns">
                    <li>
                      <button class="edit">
                        Edit
                      </button>
                    </li>
                    <li>
                    <button class="delete">
                      Delete
                      </button>
                    </li>
                  </ul>
                </section>
                <main>
                  <p class="tweet" contenteditable=true>
                    ${this.model.get('body')}
                  </p>
                  <p class="timestamp">
                    ${this.model.get('timestamp')}
                  </p>
                </main>
            `;
        }
    },
    render: function() {
        this.$el.html(this.template());
    }
});

// save contenteditable content to backend so you can edit in browser..

// document.addEventListener('keydown', function (event) {
//   var esc = event.which == 27,
//       nl = event.which == 13,
//       el = event.target,
//       input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
//       data = {};
//
//   if (input) {
//     if (esc) {
//       // restore state
//       document.execCommand('undo');
//       el.blur();
//     } else if (nl) {
//       // save
//       data[el.getAttribute('data-name')] = el.innerHTML;
//
//       $.ajax({
//         url: `https://baas.kinvey.com/appdata/${settings.appKey}/tweets/`
//         data: data,
//         type: 'post'
//       });
//
//       log(JSON.stringify(data));
//
//       el.blur();
//       event.preventDefault();
//     }
//   }
// }, true);
//
// function log(s) {
//   document.getElementById('debug').innerHTML = 'value changed to: ' + s;
// }
//


export default TweetView;
