import Backbone from 'backbone';
import moment from 'moment';

import settings from '../settings';
import session from './session';

const User = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}`,
  defaults: {
    username: '',
    joinedOn: moment().format('MMM Do YYYY'),
    firstname: '',
    lastname: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: '',
    handle: ''
  }
});

// let user = new User();
// console.log(user);

export default User;
