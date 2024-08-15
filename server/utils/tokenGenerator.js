import jwt from "jsonwebtoken";

export const tokRes = ({ user, res, sc, done }) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieExpiresIn = parseInt(process.env.COOKIE_EXPIRES_IN, 10) || 7;

  const cookieOptions = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 50 * 60 * 1000),
    httpOnly: true,
    // secure: true // Uncomment for production environment
  };

  res.cookie("jwt", token, cookieOptions);

  return res.status(sc).json({ message: done, token, data: user });
}