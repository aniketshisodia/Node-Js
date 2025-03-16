const fs = require('fs');

// utf8 -> converts binary buffer string to human readable string 

// 1. Sync
const data = fs.readFileSync('text.txt', 'utf8');
console.log(data);

// 2. Async
fs.readFile('text2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});