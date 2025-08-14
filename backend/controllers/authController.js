import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQ = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertQ, [name, email, hashedPassword], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.length) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: result[0].id, name: result[0].name, email: result[0].email } });
  });
};
