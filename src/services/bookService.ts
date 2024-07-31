import { BookRepository } from '../repositories/bookRepository';
import { Book } from '../models/book';

export class BookService {
  constructor(protected bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.getAll();
  }

  async getBookById(id: number): Promise<Book | undefined> {
    return await this.bookRepository.getById(id);
  }

  async createBook(book: Book): Promise<Book> {
    return await this.bookRepository.create(book);
  }

  async updateBook(id: number, book: Partial<Book>): Promise<Book | undefined> {
    return await this.bookRepository.update(id, book);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async getBooksByAuthorId(authorId: number): Promise<Book[]> {
    return await this.bookRepository.getBooksByAuthorId(authorId);
  }
}
