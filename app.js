const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/post.js');

const app = express();
const parserJson = express.json();

mongoose.connect(
	'URL',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const filter = function(request, file, cb) {
	if (file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/bmp") {
		cb(null, true);
	} 
	else {
		cb(null, false);
	}
}

app.use(express.static(__dirname + "/public"));
app.use(multer({dest:"public/assets", fileFilter: filter}).single("filedata"));
app.use(parserJson);
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request, response, next) => {
	request.cookies.userId = undefined;
	if (request.cookies.token) {
		let clientToken = request.cookies.token;
		jwt.verify(clientToken, '12345678', (err, payload) => {
			if (err) {
				next();
			}

			request.cookies.userId = payload.userId;
			next();
		})
	} 
	else {
		next();
	}
})

app.use('/', authRouter);
app.use('/post', postRouter);
app.use('/', function(request, response) {response.status(404).send('Not found');});

app.listen(3001);
