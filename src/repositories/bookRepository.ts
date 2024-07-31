import { Book } from '../models/book';
import { Knex } from 'knex';

export class BookRepository {
  constructor(private knex: Knex) {}

  async getAll(): Promise<Book[]> {
    return this.knex('books').select('*');
  }

  async getById(id: number): Promise<Book | undefined> {
    const book = await this.knex('books').where('id', id).first();
    return book || undefined;
  }

  async create(book: Book): Promise<Book> {
    const [id] = await this.knex('books').insert(book, 'id');
    return { ...book };
  }

  async update(id: number, book: Partial<Book>): Promise<Book | undefined> {
    const updatedBook = await this.knex('books')
      .where('id', id)
      .update(book, '*');
    return updatedBook ? updatedBook[0] : undefined;
  }

  async delete(id: number): Promise<void> {
    await this.knex('books').where('id', id).delete();
  }

  async getBooksByAuthorId(authorId: number): Promise<Book[]> {
    return this.knex('books').where('author_id', authorId).select('*');
  }
}
