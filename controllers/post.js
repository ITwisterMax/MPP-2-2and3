const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = function(request, response) {
	if (request.cookies === undefined) {
		response.status(401).json({err: 'Вы не авторизированы'});

		return;
	}

	let date = new Date();
	let userId = request.cookies.userId;

	if (userId === undefined) {
		response.status(401).json({err: 'Вы не авторизированы'});

		return;
	}

	if (request.file == undefined || request.file.filename === undefined) {
		response.status(400).json({err: 'Проверьте файл'});

		return;
	}

	let post = new Post({
		author: userId,
		description: request.body.description, 
		date: date,
		image: request.file.filename
	});

	post.save(function(err) {
		if (err) {
			response.status(500).json({err: 'Ошибка'});
		} 
		else {
			showPosts(request, response);
		}
	});
}

function showPosts(request, response) {
	if (!request.cookies?.userId) {
		response.status(401).send('Вы не авторизированы');

		return;
	}

	User.findById(request.cookies.userId, function(err, user){
		if (err) {
			response.status(500).json('Ошибка');

			return;
		}

		Post.find().populate('author').sort({date: -1}).exec(
			function(err, posts) {
				if (err) {
					response.status(500).json({err: 'Ошибка'});
				} 
				else {
					let postsToSend = posts.map( post => {
						return {
							postId: post._id,
							authorName: post.author.name,
							description: post.description,
							date: post.date,
							photo: '/assets/' + post.image
						}
					})

					response.json({posts: postsToSend});
				}
			}
		);
	}); 
}

exports.showPosts = function(request, response) {
	showPosts(request, response);
}