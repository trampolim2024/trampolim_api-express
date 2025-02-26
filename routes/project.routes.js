import {Router} from 'express';

const projectRouter = Router();

projectRouter.get('/', (req, res) => {
    res.send({
        title: 'GET all projects',
    });
});

projectRouter.get('/:id', (req, res) => {
    res.send({
        title: 'GET project by ID',
    });
});

projectRouter.post('/', (req, res) => {
    res.send({
        title: 'POST project',
    });
});

projectRouter.put('/:id', (req, res) => {
    res.send({
        title: 'UPDATE project by ID',
    });
});

projectRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'DELETE project by ID',
    });
});

projectRouter.get('/user/:id', (req, res) => {
    res.send({
        title: 'GET projects by user ID',
    });
});

projectRouter.put('/user/:id', (req, res) => {
    res.send({
        title: 'UPDATE projects by user ID',
    });
});

export default projectRouter;