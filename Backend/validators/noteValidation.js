const { body } = require('express-validator');

const noteValidationRules = () => [
    body('title', 'Title must be at least 3 characters long').optional().isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').optional().isLength({ min: 5 }),
    body('tag', 'Tag must be a string').optional().isString()
];

module.exports = noteValidationRules;
