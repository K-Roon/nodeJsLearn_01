const cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
app.use(cookieParser('1234132445AaBc'));

app.get('/count', function(req, res) {
    if(req.signedCookies.count) {
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }
    count = count + 1;
    res.cookie('count', count, {signed: true});
    res.send('count : ' + req.signedCookies.count);
});

// 데이터베이스 대체용
var products = {
    1: {title: 'The history of web 1'},
    2: {title: 'The next web'}
};

app.get('/products', function(req, res) {
    var output = '';
    for(var name in products) {
        output += `
        <li>
        <a href="/cart/${name}">${products[name].title}</a>
        </li>`;
        console.log(products[name].title);
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

/* 
cart = {
    제품의 아이디: 제품의 수량
    1: 2,
    2: 1
}
*/
app.get('/cart/:id', function(req, res) {
    var id = req.params.id;
    if(req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
    } else {
        var cart = {};
    }
    if(!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart, {signed: true});
    //console.log(cart);
    //res.send(cart);
    res.redirect('/cart');
});

app.get('/cart', function(req, res){
    var cart = req.signedCookies.cart;
    if(!cart) {
        res.send('Empty!');
    } else {
        var output = '';
        for(var id in cart) {
            output += `<li>${products[id].title} (${cart[id]})</li>`;
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>
    `);
});

app.listen(3003, function() {
    console.log('Connected 3003 port!!');
});

