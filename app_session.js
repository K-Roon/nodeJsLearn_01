var express = require('express');
var session = require('express-session');
var app = express();
app.use(session({
    secret: 'rlawoendrotoRlshangusTlqtoRl',

    //session Id를 접속할 때 마다 새로운 것을 발급 여부
    resave: false,
    saveUninitialized: true,
}));

app.get('/count', function(req, res){
    if(req.session.count) {
        req.session.count ++;
    } else {
        req.session.count = 1;
    }
    
    res.send('result : ' + req.session.count);
});
app.get('/tmp', function(req, res){
    res.send('result : ' + req.session.count);
});
app.listen(3005, function() {
    console.log('Connected 3005 port!!');
});

