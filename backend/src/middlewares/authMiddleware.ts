import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Adicione 'export' aqui
export interface CustomRequest extends Request {
  user?: { id: string; role: string }; // 'role' será importante para autorização
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
        token = req.headers.authorization.split(' ')[1];

        // Verificação do token com type assertion
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };

        req.user = decoded;
        next();
        } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Não autorizado, token falhou' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Acesso negado. Requer uma das seguintes funções: ${roles.join(', ')}` });
        }
        next();
    };
};