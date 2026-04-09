const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
// conexão com banco
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste34',
});
conn.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Conectado ao MySQL');
  app.listen(3000);
});
// ROTAS:
// inicio (formulário)
app.get('/', (req, res) => {
  res.render('home');
});
// criar
app.post('/teste/insertteste', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const sql = "INSERT INTO teste (nome, email) VALUES (?, ?)";
  conn.query(sql, [nome, email], function(err){
    if (err) {
      console.log(err);
    }
    res.redirect('/teste');
  });
});
// ler
app.get('/teste', (req, res) => {
  const sql = "SELECT * FROM teste";
  conn.query(sql, function(err, data){
    if (err) {
      console.log(err);
      return;
    }
    const teste = data;
    res.render('teste', { teste });
  });
});
// editar (carregar dados)
app.get('/teste/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM teste WHERE id = ?";
  conn.query(sql, [id], function(err, data){
    if (err) {
      console.log(err);
      return;
    }
    const teste = data[0];
    res.render('edit', { teste });
  });
});
// update
app.post('/teste/update', (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const email = req.body.email;
  const sql = "UPDATE teste SET nome = ?, email = ? WHERE id = ?";
  conn.query(sql, [nome, email, id], function(err){
    if (err) {
      console.log(err);
    }
    res.redirect('/teste');
  });
});
// deletar
app.post('/teste/remove/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM teste WHERE id = ?";
  conn.query(sql, [id], function(err){
    if (err) {
      console.log(err);
    }
    res.redirect('/teste');
  });
});