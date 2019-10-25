export default (req, res, next) => {
  // Recebe o token através do header Authorization
  const authHeader = req.headers.authorization;

  // Verifica a existência do token
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' })
  }

  // Recebe o token e dá um split para remover o "Bearer" e manter apenas o token.
  const [, token] = authHeader.split(' ');

  return next();
};
