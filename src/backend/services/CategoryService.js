import assert from 'assert';
import Joi from 'joi';
import ModelValidationException from '../exceptions/ModelValidationException';
import logger from '../misc/MyLogger';

// Using object destructuring to make it look good.
export function makeCategoryService({categoryRepository}) {
  assert(categoryRepository, 'opts.categoryRepository is required.');

  const _validateCategory = (data = {}) => {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      description: Joi.string(),
      isActive: Joi.boolean(),
    });

    const result = Joi.validate(data, schema);

    if (result.error) {
      const errorMessage = 'Error validating model: ' + JSON.stringify(result.error);
      logger.error(errorMessage);
      throw new ModelValidationException(errorMessage);
    }

  };

  return {
    list: () => {
      return categoryRepository.list();
    },
    save: (category) => {
      _validateCategory(category);

      return categoryRepository.save(category);
    },
    update: (id, payload) => {
      return categoryRepository.update(id, payload);
    },
  };

}