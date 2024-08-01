const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const usersData = await fs.readFile("./users.json");
    const users = JSON.parse(usersData);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a specific user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const usersData = await fs.readFile("./users.json");
    const users = JSON.parse(usersData);
    const user = users.find((user) => user.id == userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
