import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    number: 6377297826,
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    number: 6377297826,
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    number: 6377297826,
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
