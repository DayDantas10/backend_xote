const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsulta(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}


// Rota para buscar todas as musicas
router.get('/musicas', (req, res) => {
  executarConsulta('SELECT * FROM musica', [], res, "Erro ao encontrar música");
});

// Rota para buscar uma musica específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM musica WHERE id = ?', [id], res, "Erro na consulta de musica");
});

// Rota para criar uma nova musica
router.post('/', (req, res) => {
  const { titulo, descricao } = req.body;
  executarConsulta('INSERT INTO musica ( ) VALUES (?, ?)', [titulo, descricao], res, "Erro no cadastro de musica!");
});

// Rota para deletar uma musica
router.delete("/:id", (req, res) => {
  const musicaId = req.params.id;
  executarConsulta('DELETE FROM musica WHERE id = ?', [musicaId], res, 'Erro ao deletar musica');
});

// Rota para atualizar uma musica
router.put('/', (req, res) => {
  const { id, titulo, descricao } = req.body;
  executarConsulta('UPDATE musica SET titulo = ?, descricao = ? WHERE id = ?', [titulo, descricao, id], res, "Erro ao atualizar musica");
});

module.exports = router;