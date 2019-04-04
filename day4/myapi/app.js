'use strict'

const express = require('express');
const app = express();

// webフォルダの中身を公開する
app.use(express.static('main'));

app.get('/api/v1/list', (req, res) => {

    const profileList = require('./main/myProfile.json');
    // JSONを送信する
    res.json(profileList);
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));