const express = require('express');
const cors = require('cors');
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/pints', (req, res) => {
    console.log("Someone requested all pints!");
    res.status(200).json(pintData);
});

app.get('/pints/:id', (req, res) => {
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

app.get('/userpints', (req, res) => {
    console.log("Someone requested all user printed pints!");
    res.status(200).json(userData);
});