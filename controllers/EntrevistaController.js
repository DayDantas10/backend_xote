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


// Rota para buscar todas as entrevistas
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM entrevista', [], res, "Erro ao encontrar entrevista");
});

// Rota para buscar uma entrevista específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM entrevista WHERE id = ?', [id], res, "Erro na consulta da entrevista");
});

// Rota para criar uma nova entrevista
router.post('/', (req, res) => {
  const {nome,artista,dados} = req.body;
  executarConsulta('INSERT INTO entrevista (nome, id_artista, dados_entrevista) VALUES (?, ?, ? )', [nome,artista,dados], res, "Erro no cadastro da entrevista!");
});

// Rota para deletar uma entrevista
router.delete("/:id", (req, res) => {
  const entrevistaId = req.params.id;
  executarConsulta('DELETE FROM entrevista WHERE id = ?', [entrevistaId], res, 'Erro ao deletar entrevista');
});

// Rota para atualizar uma entrevista
router.put('/', (req, res) => {
  const { id, nome,artista, dados} = req.body;
  executarConsulta('UPDATE musica SET nome = ?, artista = ?, dados = ? WHERE id = ?', [nome,artista,dados,id], res, "Erro ao atualizar a entrevista");
});

module.exports = router;
