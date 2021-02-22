/**
 * users resolever
 *
 */
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { User } = require("../../models/userSchema");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw err;
      }
    },
  },
  Mutation: {
    async login(parent, args, context, info) {
      const { userhandle, password } = args;
      const { errors, valid } = validateLoginInput(userhandle, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // check for user existence
      const user = await User.findOne({ userhandle });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      if (!user.authenticate(password)) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    // register
    async register(parent, args, context, info) {
      const {
        registerInput: {
          userhandle,
          email,
          password,
          confirmPassword,
          fullname,
          contact,
        },
      } = args;

      // validating the user data
      const { valid, errors } = validateRegisterInput(
        userhandle,
        fullname,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //TODO: Make sure doesnot already exist
      User.find({ userhandle }).then((user) => {
        console.log(user);
      });
      // create the user

      const newuser = new User({
        fullname,
        userhandle,
        email,
        password,
        contact,
      });
      //save the user
      const saveduser = await newuser.save();

      //TODO:create jwt token
      const token = generateToken(saveduser);
      return {
        ...saveduser._doc,
        id: saveduser._id,
        token,
      };
    },
  },
};

// utility

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userhandle: user.userhandle,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}
