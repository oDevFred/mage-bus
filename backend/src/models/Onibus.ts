import mongoose from 'mongoose';

const OnibusSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: [true, 'Por favor, adicione a placa do ônibus'],
        unique: true,
        trim: true,
        uppercase: true,
    },
    linha: {
        type: String,
        required: [true, 'Por favor, adicione a linha do ônibus'],
        trim: true,
    },
    capacidade: {
        type: Number,
        required: [true, 'Por favor, adicione a capacidade de passageiros'],
        min: 1,
    },
    motorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia o modelo de Usuário
        default: null, // Pode não ter um motorista atribuído inicialmente
    },
    localizacaoAtual: {
        type: {
        type: String, // 'Point' para geolocalização no MongoDB
        enum: ['Point'],
        default: 'Point',
        },
        coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere', // Para buscas geospaciais
        default: [0, 0], // Posição padrão
        },
    },
    status: {
        type: String,
        enum: ['emOperacao', 'parado', 'emManutencao', 'indisponivel'],
        default: 'parado',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Onibus = mongoose.model('Onibus', OnibusSchema, 'onibus');

export default Onibus;