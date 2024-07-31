import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import { bookValidationRules } from '../validators/bookValidator';

const router = Router();

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookValidationRules(), bookController.createBook);
router.put('/books/:id', bookValidationRules(), bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

export default router;
