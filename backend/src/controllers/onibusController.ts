import { Request, Response, NextFunction } from 'express';
import Onibus from '../models/Onibus';
import { CustomRequest } from '../middlewares/authMiddleware'; // Para acessar req.user

// @desc    Obter todos os ônibus
// @route   GET /api/v1/onibus
// @access  Private (apenas usuários logados podem ver)
export const getOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.find().populate('motorista', 'nome email'); // Popula os dados do motorista associado
        res.status(200).json({ success: true, count: onibus.length, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Obter um único ônibus
// @route   GET /api/v1/onibus/:id
// @access  Private
export const getOnibusById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.findById(req.params.id).populate('motorista', 'nome email');
        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Ônibus não encontrado' });
        }
        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Criar novo ônibus
// @route   POST /api/v1/onibus
// @access  Private (Admin apenas)
export const createOnibus = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // A role é verificada no middleware 'authorize'
        const onibus = await Onibus.create(req.body);
        res.status(201).json({ success: true, data: onibus });
    } catch (error: any) {
        // Trata erros de validação do Mongoose, como campos obrigatórios faltando
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Atualizar ônibus
// @route   PUT /api/v1/onibus/:id
// @access  Private (Admin apenas)
export const updateOnibus = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let onibus = await Onibus.findById(req.params.id);

        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Ônibus não encontrado' });
        }

        onibus = await Onibus.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Retorna o documento modificado
        runValidators: true, // Executa as validações do esquema
        }).populate('motorista', 'nome email');

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Deletar ônibus
// @route   DELETE /api/v1/onibus/:id
// @access  Private (Admin apenas)
export const deleteOnibus = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.findById(req.params.id);

        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Ônibus não encontrado' });
        }

        await onibus.deleteOne(); // Use deleteOne() em vez de remove() para versões mais recentes do Mongoose
        res.status(200).json({ success: true, message: 'Ônibus removido com sucesso' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};