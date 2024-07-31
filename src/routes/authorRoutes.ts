import { Router } from 'express';
import * as authorController from '../controllers/authorController';
import { authorValidationRules } from '../validators/authorValidator';

const router = Router();

router.get('/authors', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorValidationRules(), authorController.createAuthor);
router.put(
  '/authors/:id',
  authorValidationRules(),
  authorController.updateAuthor,
);
router.delete('/authors/:id', authorController.deleteAuthor);
router.get('/authors/:id/books', authorController.getAuthorBooks);

export default router;
