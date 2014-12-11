
/**
 * Module dependencies.
 */

var citizen = require('citizen');
var Comments = require('./comments');

module.exports.comments = new Comments('comments', { exclude_user: citizen.logged() ? citizen.id : null });
module.exports.mycomments = new Comments('my-comments', { citizenRequired: true });