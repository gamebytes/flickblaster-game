// Generated by CoffeeScript 1.6.1

/*
## DOM helpers

Common functions and utilities for DOM manipulation
*/


(function() {

  module.exports = {
    getByRole: function(role, parent, filter) {
      var selector;
      if (parent == null) {
        parent = null;
      }
      if (filter == null) {
        filter = '';
      }
      selector = "[data-role='" + role + "']" + filter;
      if (parent == null) {
        return $(selector);
      } else {
        return parent.find(selector);
      }
    }
  };

}).call(this);
