import express from 'express'
import { checkRegister } from '../middlewares/auth';
import { register } from '../controllers/auth';

const router = express.Router()

router.post('/signup', checkRegister, register);

export default router;