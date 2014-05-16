var arb = require ("./GenericTree.js");

var txt = {
  value: '(TOP',
  children: [
    {value: '(S',
      children: [
        {value: '(NP-SBJ',
          children: [
            {value:'(NNP Ms.)'},
            {value: '(NNP Haag))'}
          ]
        },
        {value: '(VP',
          children: [
            {value: '(VBZ plays)'},
            {value: '(NP',
              children: [
                {value: '(NNP Elianti)))'}
              ]
            }
          ]
        },
        {value: '(. .)))'}
      ]
    }
  ]
};


/*var Node = require('./treeNode.js');


nson2 = new Node(5, "Filho 1");
nson2.children.push(new Node(2, "Filho do 1"));
nson3 = new Node(3, "Filho do 2");
nson4 = new Node(4, "Filho do 2 tambem");
nson5 = new Node(2, "Filho 2", [nson3, nson4]);
n = new Node(1, "(TOP ", [nson2, nson5]);



var tree = arb.parse(n, 'children');

function iterator (node) {
  var depth = "", i;
  for (i = 1; i <= node.depth; i++) depth += ">>";
  console.info([depth, node.data.value].join(" "));
}

tree.traverseDown(iterator);*/

//console.log(tree);

var tree = arb.parse(txt, 'children');

var foi = false;
var textoTree = "";
var depth = "";
var valuePrev = "";
function iterator (node) {
    var i;
    if(node.data.value[node.data.value.length-1] != ')'){
      textoTree += node.data.value;
      valuePrev = node.data.value;
      for(i = 0; i < node.data.value.length; i++){
        //console.info(i);
        depth += " ";
      }
      depth += " ";
    }

    //for (i = 1; i <= node.depth; i++) depth += " ";
    
    if(!foi){
      //textoTree += node.data.value;
      process.stdout.write(node.data.value+" ");
      //console.info(textoTree);
    } else {
      process.stdout.write(depth+node.data.value+" ");
      textoTree = textoTree.replace(valuePrev, "");
      depth = "";
      //console.info(valuePrev);
    }   
    
    if(node.data.value[node.data.value.length-1] == ')'){
      //console.log(node.data.value);
      process.stdout.write("\n");
      foi = true;
    } else {
      foi = false;
    }
    //console.info([depth, node.data.value].join(" "));
}

console.info("arvore full: ");
tree.traverseDown(iterator);

/*console.log("\npesquisando palavra NP: "+tree.find(function (node) {
    return (/NP/).test(node.data.value)
}).data.value);

console.log("\ntamanho da arvore: "+tree.length);

tree.traverseDown(function (item) {
    var toDelete = '(NP-SBJ ';
    if (item.data.value === toDelete) {
        this.remove();
    }
});

console.log("\narvore apos item removido: ");
tree.traverseDown(iterator);*/