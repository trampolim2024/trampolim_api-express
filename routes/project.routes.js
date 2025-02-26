import { Router } from 'express';
import { 
  createProject, 
  getAllProjects, 
  getProjectById, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';

const projectRoutes = Router();

projectRoutes.get('/', getAllProjects);
projectRoutes.post('/', createProject);
projectRoutes.get('/:id', getProjectById);
projectRoutes.put('/:id', updateProject);
projectRoutes.delete('/:id', deleteProject);

export default projectRoutes;
