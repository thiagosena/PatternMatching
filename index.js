var Node = require('./treeNode.js');

nson2 = new Node(5, "FILHO2");
nson = new Node(3, "FILHO", [nson2]);
n = new Node(4, "PAI", [nson]);

console.log(n.children.children);
