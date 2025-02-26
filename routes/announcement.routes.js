import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import Announcement from '../models/announcement.model.js';

const announcementRouter = Router();

// Configuração do multer para upload de PDFs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos PDF são permitidos!'), false);
    }
};

const upload = multer({ storage, fileFilter });

// GET all announcements
announcementRouter.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os editais' });
    }
});

// GET announcement by ID
announcementRouter.get('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ error: 'Edital não encontrado' });
        }
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o edital' });
    }
});

// POST new announcement with file upload
announcementRouter.post('/', upload.single('arquivoEdital'), async (req, res) => {
    try {
        const { dataInicioSubmissoes, dataFimSubmissoes, inicioAvaliacoes, fimAvaliacoes } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'O arquivo do edital é obrigatório e deve ser um PDF!' });
        }

        const novoEdital = new Announcement({
            dataInicioSubmissoes,
            dataFimSubmissoes,
            inicioAvaliacoes,
            fimAvaliacoes,
            arquivoEdital: req.file.path,
        });

        await novoEdital.save();
        res.status(201).json({ message: 'Edital criado com sucesso!', edital: novoEdital });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o edital' });
    }
});

// UPDATE announcement by ID
announcementRouter.put('/:id', async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnnouncement) {
            return res.status(404).json({ error: 'Edital não encontrado' });
        }
        res.status(200).json({ message: 'Edital atualizado com sucesso!', updatedAnnouncement });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o edital' });
    }
});

// DELETE announcement by ID
announcementRouter.delete('/:id', async (req, res) => {
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ error: 'Edital não encontrado' });
        }
        res.status(200).json({ message: 'Edital excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o edital' });
    }
});

export default announcementRouter;
