var arb = require ("./GenericTree.js");

var wikipediaJsCategory = {
  category: 'JavaScript',
  subcategories: [
    {category: 'Ajax (programming)'},
    {category: 'JavaScript engines'},
    {category: 'JavaScript programming languages family',
     subcategories: [{
       category: 'JavaScript dialect engines'
     }]
    },
    {category: 'JavaScript based calendar components'},
    {category: 'JavaScript based HTML editors'}
  ]
};

var tree = arb.parse(wikipediaJsCategory, 'subcategories');

function iterator (node) {
    var depth = "", i;
    for (i = 1; i <= node.depth; i++) depth += " ";
    console.info([depth, node.data.category].join(" "));
}

console.info("arvore full: ");
tree.traverseDown(iterator);

console.log("\npesquisando palavra calendar: "+tree.find(function (node) {
    return (/calendar/).test(node.data.category)
}).data.category);

console.log("\ntamanho da arvore: "+tree.length);

tree.traverseDown(function (item) {
    var toDelete = 'JavaScript programming languages family';
    if (item.data.category === toDelete) {
        this.remove();
    }
});

console.log("\narvore apos item removido: ");
tree.traverseDown(iterator);