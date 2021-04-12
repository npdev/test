import mongoose from "mongoose";

export interface IIssue extends mongoose.Document {
    name: string;
    done: boolean;
    userId: mongoose.Types.ObjectId;
}

const issueSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  done: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: false,
      default: null
    }
});

export const Issue = mongoose.model<IIssue>('Issue', issueSchema);
