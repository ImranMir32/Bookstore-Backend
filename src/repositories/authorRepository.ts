import { Knex } from 'knex';
import { Author } from '../models/author';
import { Book } from '../models/book';

export class AuthorRepository {
  constructor(private knex: Knex) {}

  async getAll(): Promise<Author[]> {
    return this.knex('authors').select('*');
  }

  async getById(id: number): Promise<Author | undefined> {
    const author = await this.knex('authors').where('id', id).first();
    return author || undefined;
  }

  async create(author: Author): Promise<Author> {
    const [id] = await this.knex('authors').insert(author, 'id');

    return { ...author };

    // return { id, ...author };
  }

  async update(
    id: number,
    author: Partial<Author>,
  ): Promise<Author | undefined> {
    const updatedAuthor = await this.knex('authors')
      .where('id', id)
      .update(author, '*');
    return updatedAuthor ? updatedAuthor[0] : undefined;
  }

  async delete(id: number): Promise<void> {
    await this.knex('authors').where('id', id).delete();
  }

  async getBooksByAuthorId(authorId: number): Promise<Book[]> {
    return this.knex('books').where('author_id', authorId).select('*');
  }
}
