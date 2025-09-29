const authenticate = (req, res, next) => {
  console.log("Token authentication started");
  const token = req.headers.authorization?.split(' ')[1]; // Получаем токен из заголовков

  if (!token) {
    return res.status(401).json({ message: 'Необходимо авторизоваться.' });
  }

  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Неверный или просроченный токен.' });
  }

  console.log("Token verified", decoded);
  req.userId = decoded.userId;
  next();
};
