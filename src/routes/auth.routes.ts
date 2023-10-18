import express from 'express';
import {
  loginDoctorHandler,
  loginUserHandler,
  logoutDoctorHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerDoctorHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { deserializeDoctor, deserializeUser } from '../middleware/deserializeMiddlware';
import { requireDoctor, requireUser } from '../middleware/requireMiddlware';
import { validate } from '../middleware/validate';
import { addPatientSchema, loginUserSchema } from '../schemas/user.schema';
import { createDoctor } from '../services/doctor.service';

const router = express.Router();

// Register user
router.post('/addUser', validate(addPatientSchema), registerUserHandler);

// create doctor
// DO NOT USE WITH FRONTEND, ONLY POSTMAN
router.post('/addDoctor', registerDoctorHandler)

// Login user
router.post('/loginUser', validate(loginUserSchema), loginUserHandler);

// Login doctor
router.post("/loginDoctor", validate(loginUserSchema), loginDoctorHandler)

// Logout user
router.get('/logoutUser', deserializeUser, requireUser, logoutUserHandler);

// Logout doctor
router.get('/logoutDoctor', deserializeDoctor, requireDoctor, logoutDoctorHandler);


// Refresh access token
router.get('/refresh', refreshAccessTokenHandler);

export default router;