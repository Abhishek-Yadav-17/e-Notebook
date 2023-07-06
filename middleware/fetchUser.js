import { verify } from "jsonwebtoken";
const JWT_SECRET = "Abhishekwd@123456789";

const fetchUser = (req, res, next) => {
  // Get the user from ther jwd token and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ erro: "Please authenticate using a valid token" });
  }
  try {
    const data = verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ erro: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
