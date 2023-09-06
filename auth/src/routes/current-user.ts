import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hello world from currentuser api');
});

export { router as currentUserRouter };
