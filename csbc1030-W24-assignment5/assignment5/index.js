const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routers
const usersRoutes = require('./routes/usersRoutes');

// Middleware to parse JSON request body
app.use(express.json());

// Route to handle user-related requests
app.use('/users', usersRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something broke!" });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
