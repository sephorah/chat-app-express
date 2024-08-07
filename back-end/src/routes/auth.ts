import express from 'express'
import { checkLogin, checkRegister } from '../middlewares/auth';
import { login, register } from '../controllers/auth';

const router = express.Router()

router.post('/signup', checkRegister, register);

router.post('/login', checkLogin, login);

export default router;