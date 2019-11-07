import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Esquema de validação de usuário utilizando funções do Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // Esquema de validação de usuário utilizando funções do Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(5),
      password: Yup.string()
        .min(5)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Abstrair o e-mail e a senha antiga do corpo da requisição
    const { email, oldPassword } = req.body;

    // Buscar o usuário que quer ser ediado dentro do banco de dados
    const user = await User.findByPk(req.userId);

    // Verificação para alteração do e-mail
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Verificação para alteração de senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match. ' });
    }

    // Atualiza as informações conforme o usuário enviar pelo corpo da requisição.
    const { id, name, provider } = await user.update(req.body);

    // Retorna os dados do usuário
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
