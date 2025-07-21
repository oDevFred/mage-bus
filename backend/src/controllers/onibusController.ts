import { Request, Response, NextFunction } from 'express';
import Onibus from '../models/Onibus';
import Usuario from '../models/Usuario'; // Importar o modelo User para popular
import { CustomRequest } from '../middlewares/authMiddleware';

// @desc    Obter todos os ônibus
// @route   GET /api/v1/onibus
// @access  Private (Admin, Central de Controle)
export const getOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.find().populate({
        path: 'motorista',
        select: 'nome email' // Seleciona apenas nome e email do motorista
        }); // Popula o campo 'motorista' com os dados do usuário
        res.status(200).json({ success: true, count: onibus.length, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Obter um único ônibus
// @route   GET /api/v1/onibus/:id
// @access  Private (Admin, Central de Controle)
export const getOnibusById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.findById(req.params.id).populate({
        path: 'motorista',
        select: 'nome email'
        });
        if (!onibus) {
        return res.status(404).json({ success: false, message: `Ônibus não encontrado com id de ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Criar novo ônibus
// @route   POST /api/v1/onibus
// @access  Private (Admin)
export const createOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.create(req.body);
        res.status(201).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Atualizar ônibus
// @route   PUT /api/v1/onibus/:id
// @access  Private (Admin)
export const updateOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
        });
        if (!onibus) {
        return res.status(404).json({ success: false, message: `Ônibus não encontrado com id de ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Deletar ônibus
// @route   DELETE /api/v1/onibus/:id
// @access  Private (Admin)
export const deleteOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const onibus = await Onibus.findByIdAndDelete(req.params.id);
        if (!onibus) {
        return res.status(404).json({ success: false, message: `Ônibus não encontrado com id de ${req.params.id}` });
        }
        res.status(200).json({ success: true, message: 'Ônibus removido com sucesso!' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// @desc    Obter o ônibus associado ao motorista logado
// @route   GET /api/v1/onibus/meu
// @access  Private (Motorista)
export const getMyOnibus = async (req: CustomRequest, res: Response, next: NextFunction) => { // AGORA É CustomRequest
    try {
        const onibus = await Onibus.findOne({ motorista: req.user?.id }).populate({
        path: 'motorista',
        select: 'nome email'
        });

        if (!onibus) {
        return res.status(404).json({ success: false, message: 'Nenhum ônibus atribuído a este motorista.' });
        }

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Atualizar o status do ônibus do motorista logado
// @route   PUT /api/v1/onibus/meu/status
// @access  Private (Motorista)
export const updateMyOnibusStatus = async (req: CustomRequest, res: Response, next: NextFunction) => { // AGORA É CustomRequest
    try {
        const { status } = req.body;

        if (!status || !['emOperacao', 'parado', 'emManutencao', 'indisponivel'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Status inválido fornecido.' });
        }

        const onibus = await Onibus.findOneAndUpdate(
        { motorista: req.user?.id },
        { status },
        { new: true, runValidators: true }
        ).populate({
        path: 'motorista',
        select: 'nome email'
        });

        if (!onibus) {
        return res.status(404).json({ success: false, message: 'Nenhum ônibus atribuído a este motorista para atualizar o status.' });
        }

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};