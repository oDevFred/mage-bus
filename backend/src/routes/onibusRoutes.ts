// backend/src/routes/onibusRoutes.ts
import express from 'express';
import {
    getOnibus,
    getOnibusById,
    createOnibus,
    updateOnibus,
    deleteOnibus,
    getMyOnibus,
    updateMyOnibusStatus,
    updateMyOnibusLocation,
    getAllOnibusLocations
} from '../controllers/onibusController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// **** COMECE SEMPRE COM AS ROTAS MAIS ESPECÍFICAS ****

// Rota para o motorista obter seu próprio ônibus
router.route('/meu')
    .get(protect, getMyOnibus);

// Rota para o motorista atualizar o status de seu próprio ônibus
router.route('/meu/status')
    .put(protect, updateMyOnibusStatus);

// Rota para o motorista atualizar a localização
router.route('/meu/localizacao')
    .put(protect, updateMyOnibusLocation);

// Rota para obter a localização de todos os ônibus (acesso público)
router.route('/localizacao')
    .get(getAllOnibusLocations);

// Rotas para Admin/Central de Controle (gerais, depois das específicas)
router.route('/')
    .get(protect, authorize('admin', 'centralControle'), getOnibus)
    .post(protect, authorize('admin'), createOnibus);

router.route('/:id')
    .get(protect, authorize('admin', 'centralControle'), getOnibusById)
    .put(protect, authorize('admin'), updateOnibus)
    .delete(protect, authorize('admin'), deleteOnibus);

export default router;