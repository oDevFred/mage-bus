import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path'; // Importar o módulo 'path'
import dotenv from 'dotenv';
import Usuario from '../models/Usuario';

// Carrega as variáveis de ambiente do arquivo .env na raiz do backend
dotenv.config({ path: './.env' });

// Conecta ao DB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('Erro: MONGODB_URI não está definido no .env');
    process.exit(1);
}
mongoose.connect(MONGODB_URI);

// Lê os arquivos JSON
const usuarios = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', '_data', 'usuarios.json'), 'utf-8')
);

// Importa os dados para o DB
const importData = async () => {
    try {
        // 1. Apaga os dados existentes para evitar duplicatas
        await Usuario.deleteMany();
        await Usuario.create(usuarios);

        console.log('✅ Dados importados com sucesso...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Deleta os dados do DB
const deleteData = async () => {
    try {
        await Usuario.deleteMany();
        console.log('🗑️ Dados destruídos com sucesso...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Verifica os argumentos da linha de comando para decidir a ação
if (process.argv[2] === '-i') {
    importData();
    } else if (process.argv[2] === '-d') {
    deleteData();
    } else {
        console.log('Por favor, use os argumentos -i para importar ou -d para destruir os dados.');
        process.exit();
}