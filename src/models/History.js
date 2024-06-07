// models/History.js
import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  conditionText: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model('History', HistorySchema);
export default History;
