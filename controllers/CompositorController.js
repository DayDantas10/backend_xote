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

function executarComandoDevolvendoId(sql, params ) {
  let resultado = db.query(sql, params, (err, result) => {
    if (!err) {
      return result;
    }
  });
  return resultado;
}

// Rota para buscar todas as musicas
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM compositor', [], res, "Erro ao encontrar música");
});

// Rota para buscar uma compositor específica
router.get("/:nome", (req, res) => {
  const nome = req.params.nome;
  executarConsulta("SELECT * FROM compositor WHERE nome_compositor like '?%'", [nome], res, "Erro na consulta de compositor");
});

// Rota para criar uma novo compositor
router.post('/', (req, res) => {
  const {nome, endereco} = req.body;
  let id = executarComandoDevolvendoId('INSERT INTO endereco (rua, cidade, estado) VALUES (?,?,?)', [endereco.rua, endereco.cidade, endereco.estado]);
  executarConsulta('INSERT INTO compositor ( id, nome_compositor, id_endereco ) VALUES (?, ?, ?)', [ id, nome, endereco], res, "Erro no cadastro de compositor!");
});

// Rota para deletar uma compositor
router.delete("/:id", (req, res) => {
  const compositorId = req.params.id;
  executarConsulta('DELETE FROM compositor WHERE id = ?', [compositorId], res, 'Erro ao deletar compositor');
});

// Rota para atualizar uma compositor
router.put('/', (req, res) => {
  const { id, nome, endereco } = req.body;
  executarConsulta('UPDATE compositor SET nome_compositor = ?, id_endereco= ? WHERE id = ?', [id, nome, endereco], res, "Erro ao atualizar compositor");
});

module.exports = router;