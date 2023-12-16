const Book = require('../models/book');
const Author = require('../models/author');
const BookInstance = require('../models/bookinstance');
const Genre = require('../models/genre');

const asyncHandler = require('express-async-handler');
const { render } = require('jade');

exports.index = asyncHandler(async (req, res, next) => {
	const [
		numBooks,
		numBookInstance,
		numAvailableBookInstance,
		numAuthors,
		numGenres
	] = await Promise.all([
		Book.countDocuments({}).exec(),
		BookInstance.countDocuments({}).exec(),
		BookInstance.countDocuments({status: 'Available'}).exec(),
		Author.countDocuments({}).exec(),
		Genre.countDocuments({}).exec(),
	]);

	res.render('index', {
		title: 'Local Library Home',
		book_count: numBooks,
		book_instance_count: numBookInstance,
		book_instance_available_count: numAvailableBookInstance,
		author_count: numAuthors,
		genre_count: numGenres,
	});
});

exports.book_list = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, 'title author').sort({title:1}).populate('author').exec();
	res.render('book_list', {title: 'Book List', book_list: allBooks});
});

exports.book_detail = asyncHandler(async (req, res, next) => {
	const [book, bookinstance] = await Promise.all([
		Book.findById(req.params.id).populate('author').populate('genre').exec(),
		BookInstance.find({book:req.params.id}).exec(),
	]);

	if (book === null) {
		const err = new Error('Book not found');
		err.status = 404;
		return next(err);
	}

	res.render('book_details', {
		title: book.title,
		book: book,
		book_instance: bookinstance,
	});
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book create GET');
});

exports.book_create_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book create POST');
});

exports.book_delete_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book delete GET');
});

exports.book_delete_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book delete POST');
});

exports.book_update_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book update GET');
});

exports.book_update_post = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book update POST');
});
