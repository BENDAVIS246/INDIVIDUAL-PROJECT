import express from 'express';

const router = express.Router();

// Applicant routes (profile, personal info, etc.)
router.get('/profile/:userId', (req, res) => {
  res.json({ message: 'Get applicant profile' });
});

router.put('/profile/:userId', (req, res) => {
  res.json({ message: 'Update applicant profile' });
});

export default router;
