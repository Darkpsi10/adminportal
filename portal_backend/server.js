import express, { json } from 'express';
import { createConnection } from 'mysql2';

const app = express();

// Database configuration
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'database',
  database: 'sys',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(json());

// Routes
app.post('/api/register', (req, res) => {
  const { username, pasword, email } = req.body;

  // Insert user into the database
  const sql = 'INSERT INTO panel (username, pasword, email) VALUES (?, ?, ?)';
  connection.query(sql, [id, username, pasword, email], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
      return;
    }

    res.status(201).json({ message: 'User created successfully!', userId: result.insertId });
  });
});

app.get('/api/users', (req, res) => {
  // Retrieve all users from the database
  const sql = 'SELECT * FROM panel';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'An error occurred while retrieving the users.' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  // Retrieve a specific user from the database
  const sql = 'SELECT * FROM panel WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json(results[0]);
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, pasword, email } = req.body;

  // Update user in the database
  const sql = 'UPDATE panel SET username = ?, pasword = ?, email = ? WHERE id = ?';
  connection.query(sql, [username, pasword, email, id], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully!' });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  // Delete user from the database
  const sql = 'DELETE FROM panel WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully!' });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
