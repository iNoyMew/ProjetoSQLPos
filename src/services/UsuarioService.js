const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Usuario = require('../models/Usuario');

const UsuarioService = {
    async cadastrar({ nome, email, senha, nascimento }){
        const existe = await Usuario.findOne({
            where: { email }
        })
        if(existe){
            throw new Error('Email já cadastrado');
        }

        // Validate date format
        const nascimentoDate = moment(nascimento, 'DD/MM/YYYY', true);
        if (!nascimentoDate.isValid()) {
            throw new Error('Data de nascimento inválida. Use o formato DD/MM/YYYY');
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            nome, 
            email, 
            senha: senhaHash,
            nascimento: nascimentoDate.format('YYYY-MM-DD') // Format as ISO date string
        });

        const returnUsuario = {
            nome: usuario.nome,
            email: usuario.email,
            nascimento: nascimentoDate.format('DD/MM/YYYY')
        }

        return returnUsuario;
    },

    async listar() {
        const usuarios = await Usuario.findAll();
        return usuarios;
    },

    async login({ email, senha }){
        const usuario = await Usuario.findOne({
            where: {email}
        })
        if(!usuario){
            throw new Error('Usuario não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            throw new Error('Senha Inválida');
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        return token;        
    },

    async buscarPerfil(usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Formatar a data de nascimento para DD/MM/YYYY
        const nascimentoFormatado = moment(usuario.nascimento).format('DD/MM/YYYY');

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nascimento: nascimentoFormatado
        };
    }
}

module.exports = UsuarioService;