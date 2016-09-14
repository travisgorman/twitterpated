import Backbone from 'backbone';
import settings from '../settings';
import session from './session';

const User = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}`,
  defaults: {
    username: '',
  }
});

export default User;
