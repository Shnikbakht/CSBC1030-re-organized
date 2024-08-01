const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

// Import routers
const usersRoutes = require('./routes/usersRoutes');

// Middleware to parse JSON request body
app.use(express.json());

// Route to handle user-related requests
app.use('/users', usersRoutes);

// Connect to the database and start the server
async function startServer() {
  try {
    // Authenticate with the database
    await db.sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );

    // Synchronize all defined models with the database
    await db.sequelize.sync();
    console.log('All models have been synchronized with the database.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the startServer function to connect to the database and start the server
startServer();
