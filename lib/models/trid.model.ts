import mongoose from "mongoose";

export type ITrid = {
  text: string;
  author: any;
  community: any;

  createdAt: Date;
  parentId: String;
  children: Array<any>;
};

export const tridSchema = new mongoose.Schema<ITrid>({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trid",
  }],
});

export const Trid = mongoose.models.Trid ||
  mongoose.model("Trid", tridSchema);
