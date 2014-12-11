
/**
 * Module dependencies.
 */

// var comments = require('comments').comments;
var FormView = require('form-view');
var template = require('./template');

/**
 * Creates a CommentsView
 *
 * @param {String} reference
 */

function CommentsView(law) {
  if (!(this instanceof CommentsView)) {
    return new CommentsView(law);
  }

  this.law = law;

  FormView.call(this, template, {
    law: law
  });
}

/**
 * Inherit from FormView
 */

FormView(CommentsView);

CommentsView.prototype.switchOn = function() {
  
};