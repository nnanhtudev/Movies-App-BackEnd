import authMiddleServices from '../services/authMiddleware'

const authMiddleware = async (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ EM: 'Token entry not found', EC: -1 });
  }
  let data = await authMiddleServices(token)
  if (+data.EC !== 0) {
    return res.status(401).json({ EM: 'Unauthorized', EC: 401 });
  }
  next();
};

module.exports = authMiddleware;
