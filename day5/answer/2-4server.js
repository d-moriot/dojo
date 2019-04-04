'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const CookieParser = require('Cookie-parser');
const session = require('express-session');


app.use(bodyParser());
app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    Cookie:{
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 30
    }
}));

const sessionCheck = function(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    };
}

app.get('/',  (req, res)  => res.send('ルートページ'));

app.get('/active',  (req, res)  => {
    res.send(`こんにちは${req.session.user}さん     <form method="get" action="/logout"><p><input type="submit" value="ログアウト"></p></form>`);
});

app.get('/login',  (req, res)  => {
    if(req.session.user){
        res.redirect('/active');
    }else{
        res.sendFile(__dirname+'/public/login.html');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post('/pamyu',  (req, res)  => {
    let mes = '';
    if(!req.body.userid){
        mes = `IDが空です。`;
        res.send(mes);
    }
    else if(req.body.userid === req.body.password){
        req.session.user = req.body.userid;
        res.redirect('/active');
    }else{
        mes = `ログイン失敗`;
        res.send(mes);
    }

});

app.listen(PORT);

console.log(`listening on *: ${PORT}`);