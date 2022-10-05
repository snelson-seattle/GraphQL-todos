require("dotenv").config();
const { ApolloError } = require("apollo-server-express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    user: (parent, { ID }) => User.findById(ID),
  },
  Mutation: {
    registerUser: async (
      parent,
      { registerInput: { username, email, password } }
    ) => {
      // Check for duplicate email address
      const existingEmail = await User.findOne({ email: email.toLowerCase() }).lean();
      if (existingEmail) {
        throw new ApolloError(
          "A user with email " + email + " already exists.",
          "USER_ALREADY_EXISTS"
        );
      }

      // Check for duplicate username
      const existingUsername = await User.findOne({username}).lean();
      if(existingUsername) {
        throw new ApolloError(
          "A user with username " + username + " already exists.",
          "USER_ALREADY_EXISTS"
        );
      }

      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      const token = jwt.sign(
        {
          user_id: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      newUser.token = token;

      const result = await newUser.save();

      return {
        id: result.id,
        ...result._doc,
      };
    },
    loginUser: async (parent, { loginInput: { email, password } }) => {
      const user = await User.findOne({ email });

      if (user && (await user.isCorrectPassword(password))) {
        // Create a new token
        const token = jwt.sign(
          {
            user_id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        user.token = token;

        const result = await user.save();
        return {
          id: result.id,
          ...result._doc,
        };
      } else {
        throw new ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
      }
    },
  },
};

module.exports = resolvers;
