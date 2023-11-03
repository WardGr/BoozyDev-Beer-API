const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();

const HTTP_PORT = 8080;
//const HTTPS_PORT = 4430;

app.use(cors());

app.listen(HTTP_PORT, () => {
    console.log(`HTTP server is running on port ${HTTP_PORT}`);
});

// Configure SSL/TLS options
/*const options = {
    //key: fs.readFileSync('/etc/letsencrypt/live/dropplet.wardgrosemans.be/privkey.pem'),
    //cert: fs.readFileSync('/etc/letsencrypt/live/dropplet.wardgrosemans.be/fullchain.pem')
    key: fs.readFileSync('/etc/letsencrypt/live/boozydev.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/boozydev.com/fullchain.pem')
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS server is running on port ${HTTPS_PORT}`);
});*/

app.get('/', (req, res) => {
    res.send('This is the HTTPS server file!!');
});

app.get('/pints', (req, res) => {
    console.log("Someone requested all pints!");
    res.status(200).json(pintData);
});

app.get('/userpints/:id', (req, res) => {
    const idToFind = req.params.id;
    console.log("Someone requested pint with id " + idToFind);
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id === idToFind) {
            res.status(200).json(userData[i]);
            return;
        }
    }
    res.status(440).json("Could not find pint with cet ID");
});

app.get('/userpints/user/:id', (req, res) => {
    const idToFind = req.params.id;
    console.log("Someone requested pints from user " + idToFind);
    let result = [];
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === idToFind) {
            result.push(userData[i]);
        }
    }
    if (result.length === 0)
        res.status(440).json("Could not find pint with cet ID");
    else
        res.status(200).json(result);
});

app.get('/userpints', (req, res) => {
    console.log("Someone requested all user printed pints!");
    res.status(200).json(userData);
});

app.get('/cristal', (req, res) => {
    console.log("someone requested cristal!");
    res.status(200).send({
        bier: 'Cristal',
        type: 'Pilsner',
        brewery: 'Brouwerij Alken-Maes',
        country: 'Belgium'
    });
});

app.post('/userpints/:id', (req, res) => {
    const { id } = req.params;
    const { body, username } = req.body;
    if (!body) {
        res.status(400).send({
            message: 'Info about pilsner is missing'
        });
    } else if (!username) {
        res.status(400).send({
            message: 'Username is missing'
        });
    } else {
        writeData(id, body, username);
        console.log(username +  "posted a pintje! " + id + " " + body);
        res.send({
            pilsner: `Pintje ${id} created by user ${username} with info ${body}`,
        });
    }
});

function writeData(id, body, username) {
    fs.readFile('userPints.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const newElement = {
                "username": username,
                "id": id,
                "info": body
            };
            jsonData.push(newElement);
            fs.writeFile('userPints.json', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to the file:', err);
                } else {
                    updateUserData();
                }
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
    });
}

function updateUserData() {
    const file_path = 'userPints.json';
    fs.readFile(file_path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        try {
            userData = JSON.parse(data);
            console.log(userData);
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
    });
}

var pintData;
updateUserData();
var userData;
const file_path = 'system_pints.json';
fs.readFile(file_path, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        pintData = JSON.parse(data);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});

