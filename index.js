const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
const listTODO = [];
console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    console.log(files);
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(listTODO);
            console.log(listTODO.length);
            break;

        default:
            if (command.startsWith("// TODO ")) {
                const comment = command.substring(8);
                listTODO.push(comment);
            }
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
