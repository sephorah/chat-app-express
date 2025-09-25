import express from 'express'
import { checkAuth } from '../middlewares/auth';
import { getAllUsers } from '../controllers/user';

const router = express.Router()

router.get('/users', checkAuth, getAllUsers);

export default router;