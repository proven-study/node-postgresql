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

const ResendOTP = async ({ email, otp_code, otp_expiration }) => {
  try {
    try {
      const [affectedRows, user] = await model.update(
        { otp_code, otp_expiration },
        {
          where: {
            email: email,
          },
          returning: true,
          plain: true,
        }
      );

      if (affectedRows === 0 || !user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const EmailExists = async ({ email }) => {
  try {
    const data = await model.findAll({
      where: {
        email: email,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const VerifyEmail = async ({ email, otp_code }) => {
  try {
    const user = await model.findOne({
      where: {
        email: email,
        otp_code: otp_code,
      },
    });

    if (!user) return null;

    const OTPExpired = new Date() > new Date(user.otp_expiration);
    if (OTPExpired) throw new Error("OTP is expired");

    const alreadyVerified = user.is_verified === true;
    if (alreadyVerified) throw new Error("Email has been verified");

    await model.update(
      { is_verified: true },
      {
        where: {
          email: email,
        },
      }
    );

    const updatedData = await model.findOne({
      where: {
        email: email,
      },
    });

    return updatedData;
  } catch (error) {
    throw error;
  }
};

module.exports = { Register, ResendOTP, EmailExists, VerifyEmail };
