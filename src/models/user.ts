import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    available: boolean;
}

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  available: {
        type: Boolean,
        required: true,
        default: true
    },
});

export const User = mongoose.model<IUser>('User', userSchema);
