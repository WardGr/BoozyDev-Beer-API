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