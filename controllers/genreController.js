/* eslint-disable quotes */
const Genre = require('../models/genre');
const Book = require('../models/book');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
	res.render('genre_form', {title:'Create Genre'});
});

exports.genre_create_post = [
	body('name', 'Genre name must contain at least 3 characters')
		.trim()
		.isLength({min:3})
		.escape(),
	asyncHandler(async(req, res, next) => {
		const errors = validationResult(req);
		const genre = new Genre({name:req.body.name});
		if(!errors.isEmpty()) {
			res.render('genre_form', {
				title:'Create Genre',
				genre: genre,
				errors:errors.array(),
			});
			return;
		} else {
			const genreExists = await Genre.findOne({name:req.body.name}).exec();
			if (genreExists) {
				res.redirect(genreExists.url);
			} else {
				await genre.save();
				res.redirect(genre.url);
			}
		}
	})
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
	const [ genre, BooksInGenre ] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({genre: req.params.id}, "title summary").exec(),
	]);

	if (genre === null) {
		res.redirect('/catalog/genres');
	}

	res.render('genre_delete', {
		title: 'Delete Genre',
		genre: genre,
		genre_books: BooksInGenre,
	});


});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
	const [ genre, BooksInGenre ] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({genre: req.params.id}, "title summary").exec(),
	]);

	if (BooksInGenre.length > 0) {
		res.render('genre_delete', {
			title: 'Delete Genre',
			genre: genre,
			genre_books: BooksInGenre,
		});
		return;
	} else {
		await Genre.findByIdAndDelete(req.body.id);
		res.redirect("/catalog/genres");
	}
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
	const genre = await Genre.findById(req.params.id).exec();

	if (genre === null) {
		const err = new Error('Genre not found');
		err.status = 404;
		return next(err);
	}

	res.render('genre_form', {title:'Update genre', genre: genre});
});

exports.genre_update_post = [
	body('name','Genre must contain at least 3 characters')
		.trim()
		.isLength({min:3})
		.escape(),

	asyncHandler(async(req, res, next) => {
		const errors = validationResult(req);

		const genre = new Genre({
			name: req.body.name,
			_id: req.params.id,
		});

		if (!errors.isEmpty()) {
			res.render('genre_form', {
				title:'Update Genre',
				genre: genre,
				errors: errors.array(),
			});	
			return;
		} else {
			await Genre.findByIdAndUpdate(req.params.id, genre);
			res.redirect(genre.url);
		}
	})
];
