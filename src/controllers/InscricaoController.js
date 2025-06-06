const InscricaoService = require('../services/InscricaoService');

const InscricaoController = {
    /* TODO: pegar usuario a partir do JWT*/
    async inscrever(req, res) {
        try {
            const usuarioId = req.user.id;
            const cursoId = req.params.idCurso;

            await InscricaoService.inscrever(usuarioId, cursoId);
            res.status(201).json({ mensagem: 'Inscricão realizada com sucesso'});
        } catch (error) {
            res.status(500).json({ mensagem: error.message });
            
        }
    }
}

module.exports = InscricaoController;