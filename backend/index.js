const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "portfolio.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("✅ Server Running at http://localhost:5000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// ================= Portfolio Data =================
app.get("/", async (req, res) => {
  try {
    const headerItems = await db.all("SELECT * FROM header_items");
    const aboutmeRoles = await db.all("SELECT * FROM about_me_roles");
    const projects = await db.all("SELECT * FROM featured_projects");
    const experience = await db.all("SELECT * FROM experience");
    const skillCategories = await db.all("SELECT * FROM skill_categories");
    const skills = await db.all("SELECT * FROM skills");
    const contactInfo = await db.all("SELECT * FROM contact_info");
    const socialMediaIcons = await db.all("SELECT * FROM social_media_icons");

    res.json({
      headerItems,
      aboutmeRoles,
      projects,
      experience,
      skills,
      skillCategories,
      getInTouch: { contactInfo, socialMedia: socialMediaIcons },
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
});

// ================= Contact Messages =================
// Save message
app.post("/contact", async (req, res) => {
  try {
    const { name, mail, message } = req.body;
    const createdAt = new Date().toISOString();

    if (!name || !mail || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.run(
      "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
      [name, mail, message, createdAt]
    );

    res.json({ success: true, message: "Message saved successfully!" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await db.all(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.json(messages);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
