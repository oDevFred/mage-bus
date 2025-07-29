// backend/src/controllers/onibusController.ts
import { Request, Response, NextFunction } from 'express';
import Onibus from '../models/Onibus';
import Usuario from '../models/Usuario';
import { subscribe } from 'diagnostics_channel';

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


// @desc    Obter o ônibus do motorista logado
// @route   GET /api/v1/onibus/meu
// @access  Private (motorista, admin)
export const getMyOnibus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            // Este caso não deve ser alcançado se o middleware 'protect' estiver funcionando,
            // mas satisfaz a verificação de tipos do TypeScript e torna o código mais robusto.
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const onibus = await Onibus.findOne({ motorista: req.user.id }).populate('motorista', 'nome email');

        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Nenhum ônibus atribuído a você.' });
        }

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        console.error('Erro em getMeuOnibus:', error);
        res.status(500).json({ success: false, message: error.message || 'Erro ao buscar seu ônibus.' });
    }
};

// @desc    Atualizar o status do ônibus do motorista logado
// @route   PUT /api/v1/onibus/meu/status
// @access  Private (motorista)
export const updateMyOnibusStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const { status } = req.body;
        const onibus = await Onibus.findOneAndUpdate(
            { motorista: req.user.id },
            { status },
            { new: true, runValidators: true }
        );

        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Nenhum ônibus atribuído a você.' });
        }

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        console.error('Erro em updateMeuOnibusStatus:', error);
        res.status(400).json({ success: false, message: error.message || 'Erro ao atualizar o status.' });
    }
};

// @desc    Atualizar a localização do ônibus do motorista logado
// @route   PUT /api/v1/onibus/meu/localizacao
// @access  Private (motorista)
export const updateMyOnibusLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const { latitude, longitude } = req.body;
        const onibus = await Onibus.findOneAndUpdate(
            { motorista: req.user.id },
            { latitude, longitude, ultimaLocalizacao: new Date() }, // Adicionamos o campo de última localização
            { new: true, runValidators: true }
        );

        if (!onibus) {
            return res.status(404).json({ success: false, message: 'Nenhum ônibus atribuído a você.' });
        }

        res.status(200).json({ success: true, data: onibus });
    } catch (error: any) {
        console.error('Erro em updateMeuOnibusLocalizacao:', error);
        res.status(400).json({ success: false, message: error.message || 'Erro ao atualizar a localização.' });
    }
};

// @desc    Obter a localização de todos os ônibus
// @route   GET /api/v1/onibus/localizacao
// @access  Public
export const getAllOnibusLocations = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const onibus = await Onibus.find({
            status: 'emOperacao',
            latitude: { $ne: null },
            longitude: { $ne: null }
        }).select('placa latitude longitude');

        res.status(200).json({ success: true, count: onibus.length, data: onibus });
    } catch (error: any) {
        console.error('Err em getAllOnibusLocations:', error);
        res.status(500).json({ success: false, message: error.message || 'Erro ao buscar localização do ônibus'});
    }
};