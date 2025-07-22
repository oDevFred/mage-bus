import { Request } from 'express';
import { Types } from 'mongoose';

// Estende a interface do Request para incluir a propriedade 'user'
declare global {
    namespace Express {
        interface Request {
            // O middleware de autenticação usa 'id', não '_id'
            user: {
                id: string; // O ID do usuário vindo do payload do JWT
                role: string;
            };
        }
    }
}