import mongoose from 'mongoose';
import Category from '../models/Category';

export class CategoryRepositoryMongooseImpl {
  list() {
    return Category.find({});
  }

  save(data = {}) {

    const category = new Category(data);

    return category.save();
  }

  update(id, data = {}) {
    const _id = mongoose.Types.ObjectId(id);

    const options = {new: true};
    return Category.findOneAndUpdate(_id, data, options);
  }

}