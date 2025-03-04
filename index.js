const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

const files = getFiles();
const todos = getTodos(files);

console.log('Please, write your command!');
readLine(processCommand);

function getTodos(files) {
    const todos = [];
    for (const file of files) {
        const lines = file.split('\n');
        for (const line of lines) {
            if (line.includes('// TODO ')) {
                const todo = line.substring(line.indexOf('// TODO ') + 8).trim();
                todos.push(todo);
            }
        }
    }
    return todos;
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
            console.log(todos);
            break;

        case 'sort':
            if (arg === 'importance') {
                const sorted = todos.slice().sort((a, b) => (b.match(/!/g) || []).length - (a.match(/!/g) || []).length);
                console.log(sorted);
            } else if (arg === 'user') {
                const grouped = {};
                for (const todo of todos) {
                    const [user] = todo.split(';');
                    const name = user.trim().toLowerCase() || 'unnamed';
                    if (!grouped[name]) grouped[name] = [];
                    grouped[name].push(todo);
                }
                for (const user in grouped) {
                    console.log(`User: ${user}`);
                    grouped[user].forEach(todo => console.log(`  - ${todo}`));
                }
            } else if (arg === 'date') {
                const withDate = todos.filter(todo => todo.split(';').length === 3);
                const withoutDate = todos.filter(todo => todo.split(';').length !== 3);
                withDate.sort((a, b) => new Date(b.split(';')[1].trim()) - new Date(a.split(';')[1].trim()));
                console.log([...withDate, ...withoutDate].join('\n'));
            }
            break;

        default:
            console.log('wrong command');
            break;
    }
}