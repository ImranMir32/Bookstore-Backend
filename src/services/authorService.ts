import { AuthorRepository } from '../repositories/authorRepository';
import { Author } from '../models/author';
import { Book } from '../models/book';

export class AuthorService {
  constructor(protected authorRepository: AuthorRepository) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.getAll();
  }

  async getAuthorById(id: number): Promise<Author | undefined> {
    return await this.authorRepository.getById(id);
  }

  async createAuthor(author: Author): Promise<Author> {
    return await this.authorRepository.create(author);
  }

  async updateAuthor(
    id: number,
    author: Partial<Author>,
  ): Promise<Author | undefined> {
    return await this.authorRepository.update(id, author);
  }

  async deleteAuthor(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }

  async getBooksByAuthorId(authorId: number): Promise<Book[]> {
    return await this.authorRepository.getBooksByAuthorId(authorId);
  }
}
