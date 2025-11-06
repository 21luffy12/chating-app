import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d' // Adjust expiration time as needed
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // prevent xss attack cross-site scripting attacks
    sameSite: "strict" // CSRF attacks cross-site request forgery attacks
  });
};

export default generateTokenAndSetCookie;