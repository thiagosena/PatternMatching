var fs = require('fs');
fs.readFile('teste.txt', function(err, data){
    /*
     * Read callback
     */
    if (err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    } else {
        console.log(data+"");
        fs.writeFile('teste1.txt', 'Other text', function(err){
            /*
             * Write callback
             */
            if (err) {
                console.log(err);
            }
        });
    }
});  