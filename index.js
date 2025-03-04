const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');
const { log } = require('console');

const files = getFiles();
const listTODO = [];
const listIMP = [];
const dict = [];

getListTODO(files);
console.log(listTODO)
console.log(listIMP);
function getListTODO(files) {
    for (const file of files) {
        const strings = file.split('\n'); // Разделяем строки по \n
        for (const str of strings) {
            if (str.includes('// TODO ')) {
                const comment = str.substring(str.indexOf('// TODO ') + 8).trim();
                listTODO.push(comment);
                const arr = comment.split(';');
                if (arr.length === 3) {
                    const name = arr[0].toLowerCase();
                    const date = arr[1];
                    const text = arr[2];
                    dict.push({name, date, text})
                }
                if (comment.includes("!")) {
                    listIMP.push(comment);
                }
            }
        }
    }
}


console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    //console.log(files);
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(listTODO);
            console.log(listTODO.length);
            break;
        case 'important':
            console.log(listIMP);
        default:
            if (command.split(' ')[0] === 'user') {
                const name2 = command.split(' ')[1];
                for (const element of dict) {
                    if (element.name === name2) {
                        console.log(element);
                    }
                    
                }
            }
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
