import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: true,
  },
}, {
  collection: 'Concept',
});

export default mongoose.model('Concept', schema);