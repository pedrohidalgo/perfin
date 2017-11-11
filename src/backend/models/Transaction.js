import mongoose from 'mongoose';

const schema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  concept: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Concept',
    required: true,
  },
  description: String,
  transactionDate: {
    type: Date, default: Date.now, required: true,
  },
  insertionDate: {
    type: Date, default: Date.now, required: true,
  },
}, {
  collection: 'Transaction',
});

export default mongoose.model('Transaction', schema);