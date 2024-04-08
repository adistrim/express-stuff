// list files in a folder and read the content of a file

const express = require('express');
const fs = require('fs');

const app = express();

folder = 'files'

function getList(folder) {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(files)
        })
    })
}

app.get('/', function(req, res) {
    res.send(
        '1. type /files in url to get the list of files<br>2. type /files/:filename in url to get the content of a file'
    );
})

app.get('/files', function(req, res) {
    getList(folder)
        .then(files => {
            let fileListHTML = `<ul>`;
            files.forEach(file => {
                fileListHTML += `<li>${file}</li>`
            });
            fileListHTML += '</ul>';
            res.send(`List of user readable files: <br>` + fileListHTML)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/files/:fileName', function(req, res) {
    let fileName = req.params.fileName;
    fs.readFile(`files/${fileName}`, 'utf8', (err, data) => {
        if (err) {
            res.send(err)
            return;
        }
        res.send(`You're reading contents of ${fileName} below:<br>` + data);
    })
})

app.listen(3000)
