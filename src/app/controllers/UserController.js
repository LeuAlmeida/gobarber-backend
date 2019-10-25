import User from '../models/User';

class UserController {
  async store(req, res) {
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
      return res.status(401).json({ error: 'Password does not match. '});
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
