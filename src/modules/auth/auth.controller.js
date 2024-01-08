const service = require("./auth.service");
const { response, generateOTP, sendEmail } = require("../../utils");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const otp = generateOTP();

    if (!username) {
      return response(res, 400, { message: `Username can't be empty` });
    } else if (!email || !password) {
      return response(res, 400, {
        message: `Email or password can't be empty`,
      });
    }

    const queries = {
      username,
      email,
      password,
      otp_code: otp,
      otp_expiration: new Date(Date.now() + 10 * 60 * 1000),
      is_verified: false,
    };

    const subject = "Email Verification";
    const message = `Your OTP code is: ${otp}`;

    sendEmail(queries.email, subject, message);

    const result = await service.Register(queries);

    return response(res, 201, {
      message: "Account registered",
      result: result,
    });
  } catch (error) {
    return response(res, 500, error.message);
  }
};

const ResendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    const queries = {
      email: email,
      otp_code: otp,
      otp_expiration: new Date(Date.now() + 10 * 60 * 1000),
    };

    const subject = "Email Verification";
    const message = `Your OTP code is: ${otp}`;
    const emailExists = await service.EmailExists(queries);

    if (emailExists.length <= 0) {
      return response(res, 404, { message: "User not found" });
    } else {
      sendEmail(queries.email, subject, message);
    }

    const result = await service.ResendOTP(queries);

    return response(res, 200, {
      message: "OTP is resent",
      result: result,
    });
  } catch (error) {
    console.log(error.message);
    return response(res, 500, error.message);
  }
};

const VerifyEmail = async (req, res) => {
  try {
    const { email, otp_code } = req.body;
    const emailExists = await service.EmailExists({ email });

    if (emailExists.length <= 0)
      return response(res, 404, { message: "User not found" });

    try {
      const user = await service.VerifyEmail({ email, otp_code });
      if (!user) return response(res, 400, { message: "OTP is invalid" });

      const result = user;

      return response(res, 200, {
        message: "Email is verified",
        result: result,
      });
    } catch (error) {
      if (error.message === "OTP is expired")
        return response(res, 400, { message: "OTP is expired" });
      if (error.message === "Email has been verified")
        return response(res, 401, { message: "Email has been verified" });
    }
  } catch (error) {
    return response(res, 500, error.message);
  }
};

module.exports = { Register, ResendOTP, VerifyEmail };
