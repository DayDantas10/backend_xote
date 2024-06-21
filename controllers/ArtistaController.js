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

// Rota para buscar todas os artistas
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM artista', [], res, "Erro ao encontrar música");
});

// Rota para buscar uma artista específica
router.get("/:nome", (req, res) => {
  const nome = req.params.nome;
  executarConsulta("SELECT * FROM artista WHERE nome_artista like '?%'", [nome], res, "Erro na consulta de artista");
});

// Rota para criar uma novo artista
router.post('/', (req, res) => {
  const {nome, endereco} = req.body;
  let id = executarComandoDevolvendoId('INSERT INTO endereco (rua, cidade, estado) VALUES (?,?,?)', [endereco.rua, endereco.cidade, endereco.estado]);
  executarConsulta('INSERT INTO artista ( id, nome_artista, id_endereco ) VALUES (?, ?, ?)', [ id, nome, endereco], res, "Erro no cadastro de artista!");
});

// Rota para deletar uma artista
router.delete("/:id", (req, res) => {
  const artistaId = req.params.id;
  executarConsulta('DELETE FROM artista WHERE id = ?', [artistaId], res, 'Erro ao deletar artista');
});

// Rota para atualizar uma artista
router.put('/', (req, res) => {
  const { id, nome, endereco } = req.body;
  executarConsulta('UPDATE artista SET nome_artista = ?, id_endereco= ? WHERE id = ?', [id, nome, endereco], res, "Erro ao atualizar artista");
});

module.exports = router;