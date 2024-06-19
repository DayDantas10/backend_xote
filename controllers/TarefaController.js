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

// Rota para buscar todas as tarefas
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM tarefa', [], res, "Erro na consulta de tarefas");
});

// Rota para buscar uma tarefa específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM tarefa WHERE id = ?', [id], res, "Erro na consulta de tarefa");
});

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
  const { titulo, descricao } = req.body;
  executarConsulta('INSERT INTO tarefa (titulo, descricao) VALUES (?, ?)', [titulo, descricao], res, "Erro no cadastro de tarefa!");
});

// Rota para deletar uma tarefa
router.delete("/:id", (req, res) => {
  const tarefaId = req.params.id;
  executarConsulta('DELETE FROM tarefa WHERE id = ?', [tarefaId], res, 'Erro ao deletar tarefa');
});

// Rota para atualizar uma tarefa
router.put('/', (req, res) => {
  const { id, titulo, descricao } = req.body;
  executarConsulta('UPDATE tarefa SET titulo = ?, descricao = ? WHERE id = ?', [titulo, descricao, id], res, "Erro ao atualizar tarefa");
});

module.exports = router;