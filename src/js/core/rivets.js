var rivets = require('rivets');

rivets.adapters[':'] = {
  subscribe: function(obj, keypath, callback) {
      obj.on('change:' + keypath, callback);
    },
  unsubscribe: function(obj, keypath, callback) {
      obj.off('change:' + keypath, callback);
    },
  read: function(obj, keypath) {
      return obj.get(keypath);
    },
  publish: function(obj, keypath, value) {
      obj.set(keypath, value);
    }
};

module.exports = rivets;
