import express from 'express';
import UserController from '../controllers/auth';

const router = express.Router();

router.post('/auth/signup', UserController.postUser);
router.post('/auth/login', UserController.loginUser);

export default router;
