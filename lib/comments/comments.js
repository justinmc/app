
/**
 * Module dependencies.
 */

var bus = require('bus');
var citizen = require('citizen');
var Stateful = require('stateful');

/**
 * Expose Comments
 */

module.exports = new Comments;

/**
 * Create Comments
 */

function Comments(path, options) {
  if (!(this instanceof Comments)) {
    return new Comments(path);
  }

  this.$_state = 'unloaded';
  this.$_path = path || 'comments';
  this.$_options = options;
  this.items = [];
  bus.on('page:render', this.lawrendered.bind(this));
}

/**
 * Inherit from `Stateful`
 */

Stateful(Comments);


/**
 * Handler called when
 * a page gets rendered
 */

Comments.prototype.lawrendered = function(law) {
  if ( typeof law == 'undefined' ) {
    return;
  }

  this.law = law;

  if (this.$_options.citiezenRequired && !citizen.logged()) {
    return this.state('loaded');
  } else {
    this.load();
  }
};

Comments.prototype.load = function() {
  var self = this;
  this.$_path = this.$_path;
  this.state('loading');

  request
  .get(this.url())
  .query({ exclude_user: this.$_options.exclude_user })
  .end(function(err, res) {
    var items = res.body;

    if (err || !res.ok) {
      return _handleRequestError.bind(self)(err || res.error);
    };

    this.items = items;
    self.state('loaded');
  });

  return this;
};

/**
 * Get api route
 */

Comments.prototype.url = function() {
  return '/api/law/:id/:path'
    .replace(':id', this.law)
    .replace(':path', this.path);
}

/**
 * Handle error from requests
 *
 * @param {Object} err from request
 * @api private
 */

function _handleRequestError (err) {
  // FIXME: change this off for handling it on subscribers
  // Shut ready's down
  this.off('ready');
  this.emit('error', err);
}