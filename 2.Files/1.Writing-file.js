// file module
const fs = require('fs');

// 1. Creating a File (+ Writing it)
fs.writeFileSync('text.txt', 'I love Kashish');
console.log('File written Successfully');

// 2. Creating a File (+ Writing text ) ASYNCHRONOUSLY
fs.writeFile('text2.txt', 'i love mg', (err) => {
    if (err) throw err;
    console.log(err);
});
console.log('File writtedn successfully asynchrounously');