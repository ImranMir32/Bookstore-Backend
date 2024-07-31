import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthorService } from '../services/authorService';
import { AuthorRepository } from '../repositories/authorRepository';
import knex from '../db/knex';
import { response } from '../helpers/response';

const authorRepository = new AuthorRepository(knex);
const authorService = new AuthorService(authorRepository);

export const getAuthors = async (req: Request, res: Response) => {
  await response(res, async () => await authorService.getAllAuthors(), 200);
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await authorService.getAuthorById(parseInt(req.params.id));
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, bio, birthdate } = req.body;
    const newAuthor = await authorService.createAuthor({
      name,
      bio,
      birthdate,
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, bio, birthdate } = req.body;
    const updatedAuthor = await authorService.updateAuthor(
      parseInt(req.params.id),
      { name, bio, birthdate },
    );
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const authorId = parseInt(req.params.id);
  await response(
    res,
    async () => await authorService.deleteAuthor(authorId),
    204,
  );
};

export const getAuthorBooks = async (req: Request, res: Response) => {
  await response(
    res,
    async () => await authorService.getBooksByAuthorId(parseInt(req.params.id)),
    200,
  );
};
