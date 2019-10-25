import { Router } from 'express';

// Controller de Usuário
import UserController from './app/controllers/UserController';
// Controller de Sessão
import SessionController from './app/controllers/SessionController';

// Middleware de Autenticação
import authMiddleware from './app/middlewares/auth';

// Criação do método de rotas
const routes = new Router();

// Rota para criação de usuário
routes.post('/users', UserController.store);

// Rota de login
routes.post('/sessions', SessionController.store);

// Utilização global do middleware de autenticação
routes.use(authMiddleware);

// Rota para editar usuário
routes.put('/users', UserController.update);

export default routes;
