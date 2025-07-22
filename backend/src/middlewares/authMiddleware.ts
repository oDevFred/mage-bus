import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario, { IUsuario } from '../models/Usuario'; // Supondo que você tem uma interface para o usuário no seu modelo

// Middleware de proteção de rotas
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Não autorizado a acessar esta rota.' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await Usuario.findById(decoded.id) as IUsuario | null;

        if (!user) {
            return res.status(401).json({ success: false, message: 'Token inválido. Usuário não encontrado.' });
        }

        // TypeScript agora sabe que a propriedade 'user' existe
        req.user = {
            id: user.id.toString(),
            role: user.role
        };

        next();
    } catch (error: any) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Não autorizado a acessar esta rota, token falhou.' });
    }
};

// Middleware de autorização por role (mantido para outras rotas, mas não usado para /meu agora)
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: `O usuário com role ${req.user ? req.user.role : 'desconhecida'} não tem permissão para acessar esta rota.` });
        }
        next();
    };
};
