const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenre = await Genre.find().sort( { name: 1 } ).exec();
	res.render('genre_list', {
		title: 'Genre List',
		genre_list: allGenre,
	});
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create GET');
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create POST');
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete GET');
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete POST');
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update GET');
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update POST');
});
