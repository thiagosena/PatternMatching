var myArgs = require('optimist').argv,
	help = 'This would be a great place for real help information.';

if ((myArgs.h)||(myArgs.help)) {
	console.log(help);
	process.exit(0);
}

switch (myArgs.i) {
	case 'insult':
		console.log('smells quite badly.');
		process.exit(0);
		break;
	case 'compliment':
		console.log('is really cool.');
		process.exit(0);
		break;
	default:
		console.log(help);
}

console.log('myArgs: ', myArgs);