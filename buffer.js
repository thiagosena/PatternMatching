//get the filesystem module
var fs = require('fs'), tree = require ("./GenericTree.js"),
  stream = fs.createReadStream("teste.txt", {
    flags: 'r',
    encoding: 'utf-8',
    fd: null,
    bufferSize: 1
  }), currentChar, reader = [], contador = 0;

//start reading the file
stream.addListener('data', function (char) {
    // print char by char
    for (var i = 0; i < char.length; i++){
      reader[i] = char[i];
      /*if(/^\s*$/.test(char[i])){
        console.info("");
      } else {
        process.stdout.write(char[i]);
      }*/
    }
    currentChar = reader[0];

    //console.info(currentChar);
    var createTree = "";
    var s = nextToken();
    while(s !== ')'){
      s = nextToken();
      while(s !== '(' && s !== ')'){
        console.info(s);

        s = nextToken();

      }  
    }
    
    //console.info(s);
    // var s = nextToken();
    //console.info(s);
    
    //process.stdout.write("\n");
    function nextToken() {
      if(currentChar == -1) {
        return null;
      }

      if(currentChar == '(' || currentChar == ')'){
        var s = currentChar;
        nextChar();
        return s;
      }

      //white space
      while(/^\s*$/.test(currentChar)){
        //process.stdout.write("ainda no while... ");
        nextChar();
      }

      if(currentChar == -1){
        return null;
      }

      if(currentChar == '(' || currentChar == ')'){
        var s = currentChar;
        nextChar();
        return s;
      }
      var sb = "";
      sb += currentChar;
      nextChar();
      while(currentChar != '(' && currentChar != ')' && currentChar != -1 && !(/^\s*$/.test(currentChar))){
        sb += currentChar;
        nextChar();
        //process.stdout.write("segundo while "+currentChar+"\n");
      }
      return sb;
    }

    function nextChar() {
      contador += 1;
      currentChar = reader[contador];
    }

    function createStructure(){
      return 
      {
        category: '(TOP ',
        subcategories: [
          {
            category: '(S ',
            subcategories: [
              {
                category: '(NP-SBJ ',
                subcategories: [
                  {category:'(NNP Ms.) '},
                  {category: '(NNP Haag)) '}
                ]
              },
              {
                category: '(VP ',
                subcategories: [
                  {
                    category: '(VBZ plays) '
                  },
                  {
                    category: '(NP ',
                    subcategories: [
                      {category: '(NNP Elianti))) '}
                    ]
                  }
                ]
              },
              {
                category: '(. .))) '
              }
            ]
          }
        ]
      }
    }
});