import mongoose from 'mongoose';

const evenementSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  location: { type: String, required: true }, 
  image: { type: String, required: true }, 
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

export default mongoose.model('Evenement', evenementSchema);
