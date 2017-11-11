import {makeCategoryService} from '../../../src/backend/services/CategoryService';
import {CategoryRepositoryMongooseImpl} from '../../../src/backend/repositories/CategoryRepositoryMongooseImpl';
import DBManager from '../../../src/backend/DBManager';
import logger from '../../../src/backend/misc/MyLogger';

let categoryService;

describe('Categories CRUD functionality', () => {
  beforeAll(() => {
    DBManager.connect();
    categoryService = makeCategoryService({categoryRepository: new CategoryRepositoryMongooseImpl()});
  });

  beforeEach(() => {
    DBManager.cleanUpDatabase();
  });

  //'the done param is needed in order to have jest's result output at the end
  // eslint-disable-next-line
  afterAll((done) => {
    logger.debug('closing resources');
    try {
      DBManager.cleanUpDatabase(true);
      logger.debug('everything closed...');
    } catch (ex) {
      logger.error('error: ' + ex);
    }
  });

  test('can create categories', async () => {
    const category1Data = {
      name: 'food',
      description: 'for food expenses',
    };

    const category2Data = {
      name: 'travel',
      description: 'for travel expenses',
    };

    const category1inDB = await categoryService.save(category1Data);
    const category2inDB = await categoryService.save(category2Data);

    const categories = await categoryService.list();
    // expect(categories.length).toBe(2);
    logger.debug('categories: '+categories);

    expect(category1inDB.name).toBe(category1Data.name);
    expect(category1inDB.description).toBe(category1Data.description);

    expect(category2inDB.name).toBe(category2Data.name);
    expect(category2inDB.description).toBe(category2Data.description);
  });

  test('can update categories', async () => {
    const category1Data = {
      name: 'food',
      description: 'for food expenses',
    };

    const categoryOnDB = await categoryService.save(category1Data);

    const dataToChange = {description: 'description changed'};
    const categoryUpdated = await categoryService.update(categoryOnDB._id, dataToChange);

    expect(categoryUpdated.description).toBe(dataToChange.description);
  });

  test('change category from active to inactive', async () => {
    const category1Data = {
      name: 'food',
      description: 'for food expenses',
    };

    const categoryOnDB = await categoryService.save(category1Data);
    expect(categoryOnDB.isActive).toBe(true);

    const dataToChange = {isActive: false};
    const categoryUpdated = await categoryService.update(categoryOnDB._id, dataToChange);

    expect(categoryUpdated.isActive).toBe(dataToChange.isActive);
  });

  test('should throw ModelValidationException when creating category with invalid data', () => {
    const category1Data = {
      description: 'for food expenses',
    };

    try {
      categoryService.save(category1Data);

      // eslint-disable-next-line
      fail('this line shouldnt be reached');
    } catch (ex) {
      expect(ex.name).toBe('ModelValidationException');
    }

    //Due to Babel issues dealing with inheritance on classes below lines doesn't work
    //workaround exists but I didn't have the time to fix this yet.
    // function saveCategory() {
    //   return categoryService.save(category1Data);
    // }
    // expect(saveCategory()).toThrowError(ModelValidationException);
  });
});