import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Load .env variables

dotenv.config(); // Initialize dotenv

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/groupDB";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Transaction Schema

// Define Group Schema
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  members: { type: [String], default: [] },
  currency: { type: String, default: "USD" },
  category: { type: String, default: "General" },
  createdBy: { type: String, required: true },
  transactions: [
    {
      amount: { type: Number, required: true, min: 0 },
      category: { type: String, default: "Other" },
      date: { type: Date, default: Date.now },
      paidBy: { type: String, required: true },
      splitBetween: { type: [String], default: [] },
      amountSplits: { type: [Number], default: [] },
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

// ✅ API to Create a Group
app.post("/groups", async (req, res) => {
  try {
    console.log("📥 Received Request Body:", req.body);

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

//Checking

/* app.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find();
    console.log("📤 Sending All Groups");
    res.json(groups);
  } catch (error) {
    console.error("❌ Error fetching groups:", error);
    res.status(500).json({ message: "Error fetching groups", error });
  }
}); */
// ✅ API to Fetch All Groups
app.get("/groups", async (req, res) => {
  const email = req.query.email?.trim();

  if (!email) {
    console.error("❌ No email provided in request.");
    return res.status(400).json({ error: "User email is required" });
  }

  console.log(`📥 Fetching groups for: ${email}`);

  try {
    const userGroups = await Group.find({ createdBy: email });
    console.log(`📤 Found ${userGroups.length} groups for ${email}`);
    res.json(userGroups);
  } catch (error) {
    console.error("❌ Error fetching user's groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/groups/:id/members", async (req, res) => {
  const { id } = req.params;
  const { members } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { members },
      { new: true }
    );
    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: "Failed to update members" });
  }
});

// ✅ API to Delete a Group
app.delete("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting group:", error);
    res.status(500).json({ error: "Failed to delete group" });
  }
});

// ✅ API to Add a Transaction to a Group
app.post("/groups/:id/transactions", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, paidBy, splitBetween, amountSplits } =
      req.body;

    console.log(`📥 Adding transaction to group ID: ${id}`);
    console.log("📥 Transaction data:", req.body);

    // Validate required fields
    if (!amount || !paidBy) {
      return res
        .status(400)
        .json({ error: "Amount and paidBy are required fields" });
    }

    // Create a plain transaction object
    const newTransaction = {
      amount,
      category: category || "Food",
      date: date || new Date(),
      paidBy,
      splitBetween: splitBetween || [],
      amountSplits: amountSplits || [],
    };

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { $push: { transactions: newTransaction } },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    console.log(`✅ Transaction added to group: ${updatedGroup.name}`);
    res.status(201).json(updatedGroup);
  } catch (error) {
    console.error("❌ Error adding transaction:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid group ID format" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
