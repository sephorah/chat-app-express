import express from 'express'
import { checkAuth } from '../middlewares/auth';
import { getAllProfiles } from '../controllers/profile';

const router = express.Router()

router.get('/profiles', checkAuth, getAllProfiles);

export default router;