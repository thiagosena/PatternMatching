(function () {
  'use strict';

  var Node = require('./treeNode.js');

  module.exports = function (node) {
    return {
      // Árvore é iniciada com uma raíz.
      root: (typeof node === "undefined") ? null : node,

    };
  };

}());
