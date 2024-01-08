const service = require("./auth.service");
const response = require("../../utils/responses");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return response(res, 400, { message: `Username can't be empty` });
    } else if (!email || !password) {
      return response(res, 400, {
        message: `Email or password can't be empty`,
      });
    }

    const queries = {
      username: username,
      email: email,
      password: password,
    };

    const result = await service.Register(queries);

    return response(res, 201, {
      message: "Account registered",
      result: result,
    });
  } catch (error) {
    return response(res, 500, error.message);
  }
};

module.exports = { Register };
