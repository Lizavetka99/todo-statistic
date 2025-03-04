const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

const files = getFiles();
const listTODO = [];
const listIMP = [];
const dict = [];

getListTODO(files);

console.log('Please, write your command!');
readLine(processCommand);

function getListTODO(files) {
    for (const file of files) {
        const strings = file.split('\n');
        for (const str of strings) {
            if (str.includes('// TODO ')) {
                const comment = str.substring(str.indexOf('// TODO ') + 8).trim();
                listTODO.push(comment);

                const arr = comment.split(';');
                if (arr.length === 3) {
                    const name = arr[0].toLowerCase();
                    const date = arr[1];
                    const text = arr[2];
                    dict.push({ name, date, text });
                }

                if (comment.includes('!')) {
                    listIMP.push(comment);
                }
            }
        }
    }
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const [action, arg] = command.split(' ');

    switch (action) {
        case 'exit':
            process.exit(0);
            break;

        case 'show':
            console.log(listTODO);
            console.log(`Total TODOs: ${listTODO.length}`);
            break;

        case 'important':
            console.log(listIMP);
            break;

        case 'user':
            const name2 = command.split(' ')[1];
            for (const element of dict) {
                if (element.name === name2) {
                    console.log(element);
                }
            }
            break;

        case 'sort':
            if (arg === 'importance') {
                sortImportance();
            } else if (arg === 'user') {
                sortUser();
            } else if (arg === 'date') {
                sortDate();
            }
            break;

        default:
            console.log('wrong command');
            break;
    }
}

function sortImportance() {
    const sorted = listTODO.slice().sort((a, b) => {
        const countA = (a.match(/!/g) || []).length;
        const countB = (b.match(/!/g) || []).length;
        return countB - countA;
    });
    console.log(sorted);
}

function sortUser() {
    const grouped = {};
    for (const todo of listTODO) {
        const [user] = todo.split(';');
        const name = user.trim().toLowerCase() || 'unnamed';
        if (!grouped[name]) grouped[name] = [];
        grouped[name].push(todo);
    }

    for (const user in grouped) {
        console.log(`User: ${user}`);
        grouped[user].forEach(todo => console.log(`  - ${todo}`));
    }
}

function sortDate() {
    const withDate = [];
    const noDate = [];

    for (const todo of listTODO) {
        const arr = todo.split(';');
        if (arr.length === 3 && arr[1].trim()) {
            withDate.push({ todo, date: new Date(arr[1].trim()) });
        } else {
            noDate.push(todo);
        }
    }

    withDate.sort((a, b) => b.date - a.date);

    withDate.forEach(item => console.log(item.todo));
    noDate.forEach(todo => console.log(todo));
}