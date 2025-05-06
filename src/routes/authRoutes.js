//routes/suthRoutes

import express from 'express';
import * as authController from '../controllers/authController.js';
import router from './productRoutes.js';

const routes = express.Router();

//api/register
router.post('/register', authController.registerUser);

//api/login
router.post('/login', authController.loginUser);

export default router;