const express = require('express')
const fs = require('fs');
const zlib = require('zlib');
const status = require('express-status-monitor');

const app = express();
const PORT = 8000;

app.use(status());

// create zip file of sample, without extra memory usage file being read...be zipped an written at the same time

fs.createReadStream('./sample.txt')
    .pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip'))
    );

app.get('/', (req, res) => {
    // fs.readFile('./sample.txt', (err, data) => {
    //     return res.end(data);
    // })
    const stream = fs.createReadStream('./sample.txt', "utf-8");
    stream.on("data", (chunck) => res.write(chunck));
    stream.on("end", () => res.end());
})
app.listen(PORT, () => { console.log(`Server started successfully on http://localhost:${PORT}`) })