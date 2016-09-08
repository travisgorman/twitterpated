import Backbone from 'backbone';

import User from '../models/user';
import settings from '../settings';

const Users = Backbone.Collection.extend({
  model: User,
  url: `https://baas.kinvey.com/user/${settings.appKey}/`
});

let userCollection = new Users();

export default userCollection;
