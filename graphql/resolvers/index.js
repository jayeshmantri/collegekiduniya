const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
  // modifier
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutaion,
  },
};
