import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "vikaspatelkherad", {
    expiresIn: "30d",
  });
};

export default generateToken;
