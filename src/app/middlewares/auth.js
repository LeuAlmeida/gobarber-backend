import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Recebe o token através do header Authorization
  const authHeader = req.headers.authorization;

  // Verifica a existência do token
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' })
  }

  // Recebe o token e dá um split para remover o "Bearer" e manter apenas o token.
  const [, token] = authHeader.split(' ');

  // Tentativa de descriptografar a senha
  try {
    // Decodificação da senha, promisificando a verificação do JsonWebTOken. Essa promise retorna uma função, que retornará o token e receberá a configuração do authConfigs.secret
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Inclui o id do usuário dentro do req
    req.userId = decoded.id;

    // Se chegou no next(), o usuário está pronto para acessar ao controller
    return next();

  } catch (err) {
    // Em caso de erro, deve retornar a mensagem abaixo
    return res.status(401).json({ error: 'Token invalid '})
  }
};
