import { body } from 'express-validator';

export const bookValidationRules = () => {
  return [
    body('title').isString().notEmpty(),
    body('published_date').isDate(),
    body('author_id').isInt().notEmpty(),
  ];
};
