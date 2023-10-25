import { Document, Schema, model } from "mongoose";

interface UUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<UUser>("User", UserSchema);

export default User;
