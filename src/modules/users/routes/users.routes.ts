import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthneticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthneticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
