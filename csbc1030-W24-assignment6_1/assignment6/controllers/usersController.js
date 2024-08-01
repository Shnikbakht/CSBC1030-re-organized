const fs = require('fs').promises;

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const usersData = await fs.readFile('./models/users.json');
    const users = JSON.parse(usersData);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const usersData = await fs.readFile('./models/users.json');
    const users = JSON.parse(usersData);
    const user = users.find((user) => user.id == userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to add a new user
const addUser = async (req, res) => {
  try {
    const newUser = req.body; // Assuming the request body contains the new user data
    const usersData = await fs.readFile('./models/users.json');
    const users = JSON.parse(usersData);
    users.push(newUser);
    await fs.writeFile('./models/users.json', JSON.stringify(users, null, 2));
    res.status(201).json(newUser); // Respond with status 201 Created
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
