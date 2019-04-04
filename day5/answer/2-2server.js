'use strict';

const express = require('express'); //モジュール読み込み
const app = express();
const PORT = 3000; //使うポート番号
const bodyParser = require('body-parser'); //モジュール読み込み
const CookieParser = require('Cookie-parser'); //モジュール読み込み
const session = require('express-session'); //モジュール読み込み


app.use(bodyParser());
app.use(express.static('public'));

app.use(session({
    secret: 'secret', //指定した文字列を使ってセッションIDを暗号化する
    resave: false, //セッションの変更を自動で保存（しない）
    saveUninitialized: false, //未初期化状態のセッションの保存（しない）
    Cookie:{
      //js(クライアント)でクッキー値の参照や変更を許可
        httpOnly: true,
      //httpsで利用するかどうか(今回はhttps)
        secure: false,
      //セッションの消滅時間（ミリ秒単位）３０分で消滅
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
app.get('/morita',  (req, res)  => res.send('こんにちはもりたさん'));
app.get('/yonezu',  (req, res)  => res.send('こんにちはよねずさん'));
//書き換えたためコメント化
//app.get('/login',  (req, res)  => res.sendFile(__dirname+'/public/login.html'));

app.get('/login',  (req, res)  => {
    //セッション生きてれば
    if(req.session.user){
        //森田へ
        res.redirect('/morita');
    }else{
        //切れてればログインページに
        res.sendFile(__dirname+'/public/login.html');
    }
});


/* 書き換えたためコメント化
app.post('/pamyu',  (req, res)  => {
    let mes = '';
    if(req.body.userid === 'pamyu' && req.body.password === 'pamyu'){
        mes = `ログイン成功<br>`;
        mes += `こんにちは${req.body.userid}さん`;
    }else{
        mes = `ログイン失敗`;
    }
    res.send(mes);
});
*/

app.post('/pamyu',  (req, res)  => {
    let mes = '';
    if(!req.body.userid){
        mes = `IDが空です。`;
        res.send(mes);
    }
    //IDとPASSが一致していたら
    else if(req.body.userid === req.body.password){
        //IDをセッションuserに入れ込む
        req.session.user = req.body.userid;
        res.redirect('/morita');
    }else{
        mes = `ログイン失敗`;
        res.send(mes);
    }

});

app.listen(PORT); //Webサーバー起動

console.log(`listening on *: ${PORT}`);