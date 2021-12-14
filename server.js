


// require其实就是pulling out dependency，相当于import
// ‘express’是modlue name。其实就是apply the lib as a function obj
const express = require('express');
// 其实啊，一个module是一个js lib or file，你可以import它everywhere，所以使用require（...）
// 像下面的例子，require（）里面可以是file path，也可以是module name；把return放到const中作为一个obj
const pokemon = require('./routes/pokemon.js');
const users = require('./routes/user.js');
const jobs = require('./routes/jobs.js');
const cors = require('cors');
// 用mongo
const mongoose = require('mongoose')

// 那个* path用到
const path = require('path');
//加入cookieParser： const cookieParser = require('cookie-parser'); 
// 下面有联系的是app.use(cookieParser());
const cookieParser = require('cookie-parser');
// session auth，以及session放在mongo上：
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
// tell mongoose where we want to connect to mongodb 
// 
const mongoString = 'mongodb+srv://ziliqianlin:qianlinzili@webdev.ypxxd.mongodb.net/ziliqianlin?retryWrites=true&w=majority'
mongoose.connect(mongoString, { useNewUrlParser: true })
// getting the connection details
const mongoDB = mongoose.connection;
// if error, get warning
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

//用express lib obj创建一个exp app
const app = express();


// app.use作用，
// 使用app.use 来注册函数，可以简单的认为是向那个（被我叫做）tasks的数组进行push操作
// app.use的作用是将一个中间件绑定到应用中，参数path是一个路径前缀，用于限定中间件的作用范围，所有以该前缀开始的请求路径均是中间件的作用范围，不考虑http的请求方法，例如： 
// 如果path 设置为’/’,则 
// - GET / 
// - PUT /foo 
// - POST /foo/bar 
// 均是中间件的作用范围。
// 下面这个只是一般的session方法
// app.use(session({secret: "SUPER_DUPER_SECRET"}));
// 进化的session方法：把session放在mongo上，这样server down了，依然数据不会消失
////
// 当我一个request进来，我会先到use array里面的func，这里是session。 
// 1. session会看一下cookies，试图找到session id，
// 2. 然后在 mongo db 中查找该session ID
// 3.then it will update the request object,使这个request obj包含了session data

app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));
// accepts all requests from all hosts
app.use(cors());

app.use(cookieParser());

// 先说一个express order matters 的概念，就是如果遇到重名的，指根据第一个跑


// 这面这两行就是middleware，中间件
// 下面两个就是用来modify request的
// 作用于你收到的request 和 你的code之间。任何通过这个part的code都会被这个logic更改。在这个case中
// it parse the request obj for us and turning it into easy to use object
// app.use: 
//  allows us to do is it converts some of the data in our request objects into a json object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//下面意思：如果收到任何method形式的requests /api/pokemon开头的前缀url，那就send it to const pokemon 
// 即 第九行 pokemon （也就是一个pokemon.js文件实际上）
app.use('/api/pokemon', pokemon); // PS： pokemon.js中，看我的<1>
app.use('/api/users', users);
app.use('/api/jobs', jobs);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

// app这个名字我const app建立的，但后面.get是express library本来有的
// 意思是：如果给一个url：/ 且http get request，我就返NOT BANANA回
// req, res是object，res是express帮你建立的
app.get('/banana', (req, res) => {
    res.send('NOT BANANA!');
});

// https://www.amazon.com/gp/css/order-history

app.use(express.static(path.join(__dirname, 'build')));
//最后在这写的是，如果path不match以上的，
// index.html是complied version
app.get('*', function (req, res) {
    // res will send a file 
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  
// app.listen，里面8000，所以就是postman GET localhost：8000/
app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});
