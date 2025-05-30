const Curso = require('../models/Curso');

const CursoService = {
    async listarCursos() {
        /* Equivalente: SELECT * FROM cursos */
        const cursos = await Curso.findAll();

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: 0, //implementar contagem de inscricoes
            inicio: new Date(curso.inicio).toLocaleDateString('pt-BR'),
            inscrito: false //implementar informação se o usuario logado está inscrito neste curso
        }));
    }
}

module.exports = CursoService;
