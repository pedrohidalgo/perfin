import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    minlenght: 3,
    unique: true,
    required: true,
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  collection: 'Category',
});

export default mongoose.model('Category', schema);