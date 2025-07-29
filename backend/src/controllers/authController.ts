// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import Usuario from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Registrar um novo usuário
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
    const { nome, email, senha, role } = req.body;

    try {
        const usuario = await Usuario.create({
        nome,
        email,
        senha,
        role, // A role pode ser definida no registro ou ter um padrão
        });

        sendTokenResponse(usuario, 201, res);
    } catch (error: any) {
        // Erro de validação ou email duplicado
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Logar usuário
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    // Validação básica de entrada
    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, forneça email e senha' });
    }

    try {
        // Seleciona a senha para comparação
        const usuario = await Usuario.findOne({ email }).select('+senha');

        if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Compara senhas
        const isMatch = await usuario.matchPassword(senha);

        if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        sendTokenResponse(usuario, 200, res);
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Obter usuário logado (para teste de rota protegida)
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
        }

        const user = await Usuario.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Obter todos os usuários com role 'motorista'
// @route   GET /api/v1/auth/motoristas
// @access  Private (Admin ou Central de Controle pode ver, mas vamos proteger com 'protect' por enquanto)
export const getMotoristas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const motoristas = await Usuario.find({ role: 'motorista' }).select('-senha -__v'); // Não retorna senha
        res.status(200).json({ success: true, count: motoristas.length, data: motoristas });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Função auxiliar para enviar o token JWT
const sendTokenResponse = (usuario: any, statusCode: number, res: Response) => {
    const token = usuario.getSignedJwtToken(); // O token já tem o expiresIn configurado no modelo

    // Para o cookie, podemos definir uma expiração simples, por exemplo, 1 dia
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const options = {
        expires: new Date(Date.now() + ONE_DAY_IN_MS), // Expira em 1 dia
        httpOnly: true, // Impede acesso via JavaScript do cliente
        secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
        sameSite: 'strict' as 'strict' | 'lax' | 'none', // Adiciona sameSite para segurança
    };

    res.status(statusCode)
        .cookie('token', token, options) // Opcional: enviar token em cookie
        .json({
        success: true,
        token,
        role: usuario.role // Retorna a role para o frontend
        });
};