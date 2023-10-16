import express from 'express';
import { deserializeDoctor } from '../middleware/deserializeMiddlware';
import { requireDoctor } from '../middleware/requireMiddlware';
import { changeDoctorPasswordHandler, getMyPatientsHandler } from '../controllers/doctor.controller';
import { validate } from '../middleware/validate';
import { changePasswordDoctorSchema } from '../schemas/doctor.schemas';

const router = express.Router()

// middlware for every route
router.use(deserializeDoctor, requireDoctor);

router.get("/myPatients", getMyPatientsHandler)
router.post("/changePassword", validate(changePasswordDoctorSchema), changeDoctorPasswordHandler)

export default router;