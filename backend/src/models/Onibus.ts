import mongoose, { Document, Schema } from 'mongoose';

export interface IOnibus extends Document {
    placa: string;
    status: 'emOperacao' | 'parado' | 'emManutencao' | 'indisponivel';
    capacidade?: number;
    motorista: mongoose.Schema.Types.ObjectId;
    latitude?: number;
    longitude?: number;
    linha?: string; // Adicionado: campo para a linha do ônibus
}

const OnibusSchema: Schema = new Schema({
    placa: {
        type: String,
        required: [true, 'Por favor, adicione a placa do ônibus'],
        unique: true,
        trim: true,
        maxlength: [10, 'A placa não pode ter mais de 10 caracteres']
    },
    status: {
        type: String,
        enum: ['emOperacao', 'parado', 'emManutencao', 'indisponivel'],
        default: 'parado'
    },
    capacidade: {
        type: Number,
        default: null
    },
    motorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor, adicione o motorista responsável']
    },
    latitude: {
        type: Number,
        default: null
    },
    longitude: {
        type: Number,
        default: null
    },
    linha: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IOnibus>('Onibus', OnibusSchema, 'onibus');