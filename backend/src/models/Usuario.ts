// backend/src/models/Usuario.ts
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken'; // Importe 'SignOptions' também!

// 1. Defina uma interface para os métodos personalizados
interface IUsuarioMethods {
    getSignedJwtToken(): string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// 2. Defina a interface para o documento de usuário, estendendo Document e IUsuarioMethods
export interface IUsuario extends Document, IUsuarioMethods {
    nome: string;
    email: string;
    senha?: string;
    role: 'passageiro' | 'motorista' | 'centralControle' | 'admin';
    createdAt: Date;
    // Métodos que você adiciona ao schema (se existirem)
    matchPassword(enteredPassword: string): Promise<boolean>;
    getSignedJwtToken(): string;
}

// 3. Defina o esquema (Sem alterações aqui)
const UsuarioSchema = new mongoose.Schema<IUsuario>({
    nome: {
        type: String,
        required: [true, 'Por favor, adicione um nome'],
    },
    email: {
        type: String,
        required: [true, 'Por favor, adicione um email'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, adicione um email válido',
        ],
    },
    senha: {
        type: String,
        required: [true, 'Por favor, adicione uma senha'],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['passageiro', 'motorista', 'centralControle', 'admin'],
        default: 'passageiro',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encriptar senha antes de salvar (Sem alterações aqui)
UsuarioSchema.pre<IUsuario>('save', async function (next) {
    if (!this.isModified('senha')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha!, salt);
});

// Gerar e retornar token JWT
UsuarioSchema.methods.getSignedJwtToken = function (): string {
    // Verifique e afirme que JWT_SECRET e JWT_EXPIRES_IN existem e são strings.
    // Isso é crucial para que o TypeScript confie nos tipos.
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não está definido nas variáveis de ambiente.');
    }
    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error('JWT_EXPIRES_IN não está definido nas variáveis de ambiente.');
    }

    // Defina as opções do token JWT explicitamente com o tipo SignOptions
    const jwtOptions: SignOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN as any
    };

    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET as Secret,
        jwtOptions
    );
};

// Comparar senha digitada com senha hashed no DB (Sem alterações aqui)
UsuarioSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.senha);
};

// Exporte o modelo com o tipo de Modelo, incluindo os métodos personalizados (Sem alterações aqui)
const Usuario = mongoose.model<IUsuario, Model<IUsuario>>('Usuario', UsuarioSchema);

export default Usuario;