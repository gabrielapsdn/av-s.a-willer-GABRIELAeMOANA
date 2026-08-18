import express from 'express';
import { prisma } from './database.js';

const app = express();
app.use(express.json());


app.post('/equipes', async (req, res) => {
  try {
    const { nome, especialidade } = req.body;
    const equipe = await prisma.equipe.create({ data: { nome, especialidade } });
    res.status(201).json(equipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/equipes', async (req, res) => {
  try {
    const equipes = await prisma.equipe.findMany({ include: { desenvolvedores: true } });
    res.json(equipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/equipe', async (req, res) => {
  try {
    const { id, nome, especialidade } = req.body;
    const equipe = await prisma.equipe.update({
      where: { id: Number(id) },
      data: { nome, especialidade }
    });
    res.json(equipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/equipe/:id', async (req, res) => {
  try {
    await prisma.equipe.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/equipes/:id/desenvolvedores', async (req, res) => {
  try {
    const devs = await prisma.desenvolvedor.findMany({
      where: { equipeId: Number(req.params.id) }
    });
    res.json(devs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/desenvolvedores', async (req, res) => {
  try {
    const { nome, nivel, equipeId } = req.body;
    const dev = await prisma.desenvolvedor.create({
      data: { nome, nivel, equipeId: Number(equipeId) }
    });
    res.status(201).json(dev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/desenvolvedores', async (req, res) => {
  try {
    const { id, nome, nivel, equipeId } = req.body;
    const dev = await prisma.desenvolvedor.update({
      where: { id: Number(id) },
      data: {
        nome,
        nivel,
        equipeId: equipeId ? Number(equipeId) : undefined
      }
    });
    res.json(dev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/desenvolvedores/:id', async (req, res) => {
  try {
    await prisma.desenvolvedor.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor executando na porta 3000');
});