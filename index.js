const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

function getListTODO(files) {
    for (const file of files) {
        const strings = file.split('\r\n');
        for (const str of strings) {
            if (str.includes("// TODO ")) {
                const indexStartComment = str.indexOf("// TODO ") + 8;
                const indexEndComment = str.indexOf(";", indexStartComment);
                const comment = str.substring(indexStartComment, indexEndComment);

            }
        }
    }
}

const listTODO = getListTODO(files);
console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
