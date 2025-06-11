const CursoService = require('../services/CursoService');

const CursoController = {
    async listarCursos(req, res) {
        try {
            const filtro = req.query.filtro || null;
            const usuarioId = req.user.id;
            const cursos = await CursoService.listarCursos(usuarioId, filtro);
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar cursos: " + error});
        }
    },

    async listarCursosInscritos(req, res) {

        try {
            const usuarioLogado = req.user.id;
            const usuarioSolicitadoId = req.params.idUsuario;

            if(usuarioLogado != usuarioSolicitadoId) {
                return res.status(403).json({ 
                    mensagem: "Não autorizado a ver inscrições de outro usuário!"
                });
            }

            const cursos = await CursoService.listarCursosInscritos(usuarioLogado);
            return res.status(200).json(cursos);

        } catch (error) {
            return res.status(500).json({mensagem: "Erro ao buscar cursos: " + error.message})
        }
    }
}

module.exports = CursoController;