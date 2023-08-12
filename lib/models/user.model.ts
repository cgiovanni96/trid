import mongoose from "mongoose";

export type IUser = {
  id: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  onboarded: boolean;
  threads?: Array<any>;
  communities?: Array<any>;
};

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
