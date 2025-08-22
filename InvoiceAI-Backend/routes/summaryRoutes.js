import express from 'express';
import { summarizeById } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/', summarizeById);

export default router;
