import mongoose, { Document, Schema } from 'mongoose';

export interface IOnibus extends Document {
    placa: string;
    modelo: string;
    status: 'emOperacao' | 'parado' | 'emManutencao' | 'indisponivel';
    motorista: mongoose.Schema.Types.ObjectId;
    latitude?: number;
    longitude?: number;
}

const OnibusSchema: Schema = new Schema({
    placa: {
        type: String,
        required: [true, 'Por favor, adicione a placa do ônibus'],
        unique: true,
        trim: true,
        maxlength: [10, 'A placa não pode ter mais de 10 caracteres']
    },
    modelo: {
        type: String,
        required: [true, 'Por favor, adicione o modelo do ônibus']
    },
    status: {
        type: String,
        enum: ['emOperacao', 'parado', 'emManutencao', 'indisponivel'],
        default: 'parado'
    },
    motorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor, adicione o motorista responsável']
    },
    latitude: { // Adicionado
        type: Number,
        default: null
    },
    longitude: { // Adicionado
        type: Number,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model<IOnibus>('Onibus', OnibusSchema, 'onibus');