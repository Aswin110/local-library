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