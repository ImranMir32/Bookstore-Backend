import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import knex from '../db/knex';
import { BookRepository } from '../repositories/bookRepository';
import { BookService } from '../services/bookService';
import { response } from '../helpers/response';
import { HttpRequestError } from '../helpers/http-request-error';

const bookRepository = new BookRepository(knex);
const bookService = new BookService(bookRepository);

export const getBooks = async (req: Request, res: Response) => {
  await response(res, async () => await bookService.getAllBooks(), 200);
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpRequestError('Validation Error: ', 400);
  }
  const { title, description, published_date, author_id } = req.body;

  await response(
    res,
    async () =>
      await bookService.createBook({
        title,
        description,
        published_date: new Date(published_date),
        author_id,
      }),
    201,
  );
};

export const updateBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpRequestError('Validation Error: ', 400);
  }

  try {
    const { title, description, published_date, author_id } = req.body;
    const updatedBook = await bookService.updateBook(parseInt(req.params.id), {
      title,
      description,
      published_date,
      author_id,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  await response(res, async () => await bookService.deleteBook(bookId), 204);
};

export const getBooksByAuthorId = async (req: Request, res: Response) => {
  await response(
    res,
    async () => await bookService.getBooksByAuthorId(parseInt(req.params.id)),
    200,
  );
};
