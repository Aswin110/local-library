const Genre = require('../models/genre');
const Book = require('../models/book');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenre = await Genre.find().sort( { name: 1 } ).exec();
	res.render('genre_list', {
		title: 'Genre List',
		genre_list: allGenre,
	});
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
	const [genre, bookInGenre] = await Promise.all([
		Genre.findById(req.params.id).exec(),						// to get the genre id
		Book.find({genre: req.params.id}, 'title summary').exec(),	//  to get all books records that have that same associated genre ID.
	]);

	if (genre === null) {
		const err = new Error('Genre not found');
		err.status = 404;
		return next(err);
	}

	res.render('genre_detail', {
		title: 'Genre Detail',
		genre: genre,
		genre_books: bookInGenre,
	});
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create GET');
});

exports.genre_create_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create POST');
});

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete GET');
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete POST');
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update GET');
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update POST');
});
