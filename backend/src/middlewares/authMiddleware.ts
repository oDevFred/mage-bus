console.log('>>> authMiddleware.ts: Arquivo carregado! Versão: ' + new Date().toISOString()); // Adicione esta linha
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario, { IUsuario } from '../models/Usuario'; // Supondo que você tem uma interface para o usuário no seu modelo

// Interface para o payload do JWT (o que será adicionado a req.user)
export interface UserPayload {
    id: string;
    role: string;
    // Adicione outras propriedades do usuário que você queira acessar diretamente via req.user
}

// Interface CustomRequest para estender o Request do Express
export interface CustomRequest extends Request {
    user?: UserPayload; // A propriedade 'user' agora é opcional aqui
}

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

        console.log('Token Decodificado:', decoded);
        console.log('ID do Usuário do Token:', decoded.id);

        const user = await Usuario.findById(decoded.id) as IUsuario | null;

        console.log('Usuário Encontrado no Banco:', user ? user.email : 'Nenhum');
        console.log('Role do Usuário Encontrado:', user ? user.role : 'N/A');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Token inválido. Usuário não encontrado.' });
        }

        if (user && user._id) {
            // Explicitamente faz o cast de 'req' para um tipo que inclui 'user'
            // O tipo Request & { user: UserPayload } funciona para adicionar a propriedade
            (req as Request & { user: UserPayload }).user = {
                id: user._id.toString(),
                role: user.role
            };
        } else {
            return res.status(500).json({ success: false, message: 'Erro interno: ID do usuário não encontrado após busca.' });
        }

        next();
    } catch (error: any) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Não autorizado a acessar esta rota, token falhou.' });
    }
};

// Middleware de autorização por role (mantido para outras rotas, mas não usado para /meu agora)
export const authorize = (...roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log('Roles permitidas para esta rota:', roles); // Deixe a mensagem original ou a que preferir
        console.log('Role do usuário logado (req.user.role):', req.user?.role);

        if (!req.user || !roles.includes(req.user.role)) { // Descomente estas linhas
            console.log('ACESSO NEGADO: Role do usuário não está entre as permitidas.'); // Descomente
            return res.status(403).json({ success: false, message: `O usuário com role ${req.user ? req.user.role : 'desconhecida'} não tem permissão para acessar esta rota.` }); // Descomente
        }
        console.log('ACESSO PERMITIDO!'); // Descomente
        next(); // Descomente
    };
};
