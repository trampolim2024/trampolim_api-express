import {Router} from 'express';

const announcementRouter = Router();

announcementRouter.get('/', (req, res) => {
    res.send({
        title: 'GET all announcements',
    });
});

announcementRouter.get('/:id', (req, res) => {
    res.send({
        title: 'GET announcement by ID',
    });
});

announcementRouter.post('/', (req, res) => {
    res.send({
        title: 'POST announcement',
    });
});

announcementRouter.put('/:id', (req, res) => {
    res.send({
        title: 'UPDATE announcement by ID',
    });
});

announcementRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'DELETE announcement by ID',
    });
});

export default announcementRouter;