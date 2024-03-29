const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
    
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      }
    );

  });
  bookRouter.get('/books/:bookId', (req, res) => {
    Book.findById(req.params.bookId, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });

  });
  return bookRouter;
}

module.exports = routes;