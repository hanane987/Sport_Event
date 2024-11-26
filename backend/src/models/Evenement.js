import mongoose from 'mongoose';

const evenementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
    ],
  },
  { timestamps: true }
);

   const Evenement = mongoose.model('Evenement', evenementSchema);
export default Evenement;
