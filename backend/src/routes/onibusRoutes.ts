// backend/src/routes/onibusRoutes.ts
import express from 'express';
import {
    getOnibus,
    getOnibusById,
    createOnibus,
    updateOnibus,
    deleteOnibus,
    getMyOnibus, // Importe a nova função
    updateMyOnibusStatus // Importe a nova função
} from '../controllers/onibusController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// Rotas para Admin/Central de Controle
router.route('/')
    .get(protect, authorize('admin', 'centralControle'), getOnibus)
    .post(protect, authorize('admin'), createOnibus); // Apenas admin pode criar

router.route('/:id')
    .get(protect, authorize('admin', 'centralControle'), getOnibusById)
    .put(protect, authorize('admin'), updateOnibus) // Apenas admin pode atualizar
    .delete(protect, authorize('admin'), deleteOnibus); // Apenas admin pode deletar

// NOVAS ROTAS PARA MOTORISTA
router.get('/meu', protect, authorize('motorista'), getMyOnibus); // Motorista logado pode ver seu ônibus
router.put('/meu/status', protect, authorize('motorista'), updateMyOnibusStatus); // Motorista logado pode atualizar o status do seu ônibus

export default router;