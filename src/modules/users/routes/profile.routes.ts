import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthneticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthneticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('new_password'))
        .when('new_password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
