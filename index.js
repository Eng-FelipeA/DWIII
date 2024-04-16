const express = require('express');
const app = express();
app.use(express.json());

let alunos = [];

// Método POST para adicionar um aluno na lista
app.post('/alunos', (req, res) => {
  const { RA, Nome, Turma } = req.body;
  const novoAluno = { RA, Nome, Turma, cursos: [] };
  alunos.push(novoAluno);
  res.json(novoAluno);
});

// Método POST para adicionar um curso para o aluno
app.post('/alunos/:RA/cursos', (req, res) => {
  const RA = req.params.RA;
  const curso = req.body.curso;
  const aluno = alunos.find(a => a.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.cursos.push(curso);
  res.json(aluno);
});

// Método PUT para alterar os dados de um aluno através do RA
app.put('/alunos/:RA', (req, res) => {
  const RA = req.params.RA;
  const { Nome, Turma } = req.body;
  const aluno = alunos.find(a => a.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.Nome = Nome;
  aluno.Turma = Turma;
  res.json(aluno);
});

// Método PUT para alterar o curso do aluno
app.put('/alunos/:RA/cursos', (req, res) => {
  const RA = req.params.RA;
  const novoCurso = req.body.curso;
  const aluno = alunos.find(a => a.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.cursos = [novoCurso];
  res.json(aluno);
});

// Método DELETE para remover um aluno da lista
app.delete('/alunos/:RA', (req, res) => {
  const RA = req.params.RA;
  alunos = alunos.filter(a => a.RA !== RA);
  res.json({ message: 'Aluno removido com sucesso' });
});

// Método DELETE para remover um curso do aluno
app.delete('/alunos/:RA/cursos/:curso', (req, res) => {
  const RA = req.params.RA;
  const curso = req.params.curso;
  const aluno = alunos.find(a => a.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.cursos = aluno.cursos.filter(c => c !== curso);
  res.json(aluno);
});

// Método GET para listar todos os alunos (RA, Nome, Turma)
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Método GET para listar um aluno através do RA informado (Nome, Turma, Cursos)
app.get('/alunos/:RA', (req, res) => {
  const RA = req.params.RA;
  const aluno = alunos.find(a => a.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json({ Nome: aluno.Nome, Turma: aluno.Turma, Cursos: aluno.cursos });
});

// Inicializa o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});