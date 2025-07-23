import express from 'express';
import { registeruser,logginUser } from '../controllers/Usercontroller.js';

const router = express.Router();

router.post('/register',registeruser);
router.post('/login',logginUser);

export default router;