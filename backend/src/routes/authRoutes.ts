import express from 'express';
import { register, login, getMe, getMotoristas } from '../controllers/authController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // Exemplo de rota protegida

// Nova rota para listar motoristas
router.get('/motoristas', protect, authorize('admin', 'centralControle'), getMotoristas); // Pode ser acessada por admin e centralControle

export default router;