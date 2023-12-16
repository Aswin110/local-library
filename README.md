# local-library

 a very basic Express website developed as a tutorial example on the Mozilla Developer Network. (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

 ## Genre details

 First use Genre.findById() to get Genre information for a specific ID, and Book.find() to get all books records that have that same associated genre ID. 

 check if the genre exists in the data base(it may have been deleted) in this case we will display not found page.

 using description list tag (dl) displayed the books with same genre ID in genre_detail.jade.

 ## Book details

First use Book.findById() to get the genre and populate the author and genre values. BookInstance.find() to get all instances record that have same book ID.

if no match found for the books then a not found page is returned.

The list of genres associated with the book is implemented in the template as below. This adds a comma after every genre associated with the book except for the last one.

PUG
Copy to Clipboard
  p #[strong Genre:]
    each val, index in book.genre
      a(href=val.url) #{val.name}
      if index < book.genre.length - 1
        |,

'|' pipe operator will separate the values in the array.
for example ["Science Fiction", "Fantasy", "Horror"], then the output of the code would be:
Science Fiction, Fantasy, Horror

## Author details

First use Author.findById() to get the author. Books.find() to get all books record that have same author ID.

if no match found for the author then a not found page is returned.

The list of books associated with the author is implemented in the template.

## Book instance details

First use BookInstance.findById() to get the bookinstance.

if no match found for the bookinstance then a not found page is returned.

The bookinstance is implemented in the template bookinstance_detail.jade.

## Genre form page

The first thing is that instead of being a single middleware function (with arguments (req, res, next)) the controller specifies an array of middleware functions. The array is passed to the router function and each method is called in order.

In the req.body allow us to access the string name and we can validate name as shown below.
[
  // …
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name empty.")
    .isAlpha()
    .withMessage("Name must be alphabet letters."),
  // …
];

create new Genre model to save new genres

And we use validationResult to check whether there is an error. If there is an error render the form again with sanitized errors.

Or when the data is valid check whether the genre name is present in the DB. if the name already exist render the that genre name else save the new genre name to the DB and render it.

asyncHandler(async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    // Error messages can be returned in an array using `errors.array()`.
  } else {
    // Data from form is valid.
  }
});