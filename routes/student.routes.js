import express from 'express';
const router = express.Router();
import {
    getAllStudent,
    registerStudent,
    registerForm,
    updateStudent,
    updateForm,
    deleteStudent 
} from '../controllers/student.controller.js';

router.route('/')
    .get(getAllStudent);

router.route('/register')
    .get(registerForm)
    .post(registerStudent);

router.route('/:id/update')
    .get(updateForm)
    .post(updateStudent);

router.route('/:id/delete')
    .post(deleteStudent);

export default router;