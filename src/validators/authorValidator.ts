import { body } from 'express-validator';

export const authorValidationRules = () => {
  return [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('Name is required and should be a non-empty string.'),
    body('bio').optional().isString().withMessage('Bio should be a string.'),
    body('birthdate')
      .isDate()
      .withMessage('Birthdate is required and should be a valid date.'),
  ];
};
