import express from 'express';
const router = express.Router();

// Example route
router.get('/users', (req, res) => {
  res.send('Users list');
});

export default router;