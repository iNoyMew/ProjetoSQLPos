const Inscricao = require('../models/Inscricao');
const Curso = require('../models/Curso');

const InscricaoService = {
    async inscrever(usuarioId, cursoId) {
        const curso = await Curso.findByPk(cursoId);
        if(!curso) throw new Error('Curso não encontrado!');

        const existente = await Inscricao.findOne({
            where: {
                usuario_id: usuarioId,
                curso_id: cursoId,
                data_cancelamento: null
            }
        });

        if(existente) throw new Error('Usuario já inscrito nesse curso!');

        const novaInscricao = await Inscricao.create({
            usuario_id: usuarioId,
            curso_id: cursoId,
            data_inscricao: new Date(),
            data_cancelamento: null
        })

        return novaInscricao;
    }
}

module.exports = InscricaoService;