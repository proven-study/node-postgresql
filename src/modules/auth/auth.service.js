const model = require("../../database/models/user");

const Register = async ({ username, email, password }) => {
  try {
    const newUser = await model.create({
      username,
      email,
      password,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { Register };
