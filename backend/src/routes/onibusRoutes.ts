// backend/src/routes/onibusRoutes.ts
import express from 'express';
import {
    getOnibus,
    getOnibusById,
    createOnibus,
    updateOnibus,
    deleteOnibus,
} from '../controllers/onibusController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// Rotas públicas (apenas protegidas por login)
router.get('/', protect, getOnibus);
router.get('/:id', protect, getOnibusById);

// Rotas restritas a administradores
router.post('/', protect, authorize('admin'), createOnibus);
router.put('/:id', protect, authorize('admin'), updateOnibus);
router.delete('/:id', protect, authorize('admin'), deleteOnibus);

export default router;