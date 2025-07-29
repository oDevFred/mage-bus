// backend/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Importe o pacote cors
import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import onibusRoutes from './routes/onibusRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/magebus';

// Conexão com o MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// ** Habilitar CORS para todas as origens (PARA DESENVOLVIMENTO) **
// Em produção, você deve restringir 'origin' apenas aos seus domínios de frontend.
app.use(cors());

// Rotas da API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/onibus', onibusRoutes);

// Rota de teste
app.get('/', (req: Request, res: Response) => {
    res.send('Hot-reload funcionando 100%!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});