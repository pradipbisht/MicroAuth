import mongoose from "mongoose";
import argon2 from "argon2";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hash(this.password);
});

UserSchema.methods.verifyPassword = async function (plainPassword) {
  return await argon2.verify(this.password, plainPassword);
};

// Export as "User" to match the RefreshToken ref
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
