import User from "../models/user.model.js";

import { nameSchema } from "../zod/auth.schema.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: JSON.parse(error.message) });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = nameSchema.parse(req.body);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: JSON.parse(error.message) });
  }
};
