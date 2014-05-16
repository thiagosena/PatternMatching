// Class: TreeNode
//
// Representa o nó da árvore.
//
// Atributos:
//   key - referência a chave, parâmetro de comparação entre nós
//   valye - referência ao valor guardado pelo nó, pode ser qualquer tipo de dado
//   children - uma lista de filhos que o nó possui
//
// Nota: caso não fornecidos, todos key e value serão setados para null.

(function () {
  'use strict';

  module.exports = function (key, value, children) {
    return {
      key: (typeof key === "undefined") ? null : key,
      value: (typeof value === "undefined" ) ? null : value,
      children: (typeof children === "undefined") ? [] : children
    };
  };

}());
