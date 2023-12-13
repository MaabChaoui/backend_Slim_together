import express from 'express';
import { deserializeDoctor } from '../middleware/deserializeMiddlware';
import { requireDoctor } from '../middleware/requireMiddlware';
import { changeDoctorPasswordHandler, getDoctorHandler, getMyPatientsHandler, loadDoctorMessagesHandler } from '../controllers/doctor.controller';
import { validate } from '../middleware/validate';
import { changePasswordDoctorSchema } from '../schemas/doctor.schemas';

const router = express.Router()

router.get('/', getDoctorHandler)

// middlware
router.use(deserializeDoctor, requireDoctor);

router.get("/myPatients", getMyPatientsHandler)
router.post("/changePassword", validate(changePasswordDoctorSchema), changeDoctorPasswordHandler)
router.post("/loadMessages", loadDoctorMessagesHandler)

export default router;