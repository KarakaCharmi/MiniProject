import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Load .env variables

dotenv.config(); // Initialize dotenv

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/groupDB";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Group Schema
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Changed from groupName
  description: { type: String, default: "" }, // Changed from groupDescription
  members: { type: [String], default: [] },
  currency: { type: String, default: "USD" },
  category: { type: String, default: "General" },
  createdBy: { type: String, required: true },
});

const Group = mongoose.model("Group", groupSchema);

// ✅ API to Create a Group
app.post("/groups", async (req, res) => {
  try {
    console.log("📥 Received Request Body:", req.body); // Debugging log

    const { name, description, members, currency, category, createdBy } =
      req.body;

    if (!name || !currency || !category || !createdBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newGroup = new Group({
      name,
      description: description || "",
      members: members || [],
      currency,
      category,
      createdBy,
    });

    const savedGroup = await newGroup.save();
    console.log("✅ Group Saved:", savedGroup);
    res.status(201).json(savedGroup);
  } catch (error) {
    console.error("❌ Error saving group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ API to Fetch All Groups
app.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find();
    console.log("📤 Sending All Groups");
    res.json(groups);
  } catch (error) {
    console.error("❌ Error fetching groups:", error);
    res.status(500).json({ message: "Error fetching groups", error });
  }
});

// ✅ API to Fetch Groups by User Email (Fix for 404 Error)
app.get("/groups/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`📥 Fetching groups for email: ${email}`);

    const userGroups = await Group.find({ createdBy: email });

    if (!userGroups.length) {
      return res.status(404).json({ error: "No groups found for this user" });
    }

    console.log(`📤 Found ${userGroups.length} groups`);
    res.json(userGroups);
  } catch (error) {
    console.error("❌ Error fetching user's groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
