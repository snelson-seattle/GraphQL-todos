const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findById(userId);
    },

    currentUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const existingUser = await User.findOne({ email }).exec();

      if (!existingUser) {
        throw new AuthenticationError("No user with this email was found!");
      }

      const matchingPassword = await existingUser.isCorrectPassword(password);

      if (!matchingPassword) {
        throw new AuthenticationError("Incorrect Password!");
      }

      const token = signToken(existingUser);
      return { token, existingUser };
    },
  },
};

module.exports = resolvers;
