const { AuthenticationError, UserInputError } = require("apollo-server");
const { Post } = require("../../models/postSchema");
const {
  isAuthenticated,
  isRCS,
  isADMIN,
  isRCA,
} = require("../../utils/checkAuthenticity");
module.exports = {
  Query: {
    async getPost(parent, args, context, info) {
      const { postId } = args;
      try {
        const post = await Post.findById(postId).populate("postedBy likes");
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPosts() {
      try {
        const posts = await Post.find({}).populate("postedBy likes");
        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async likePost(parent, args, context, info) {
      const { postId } = args;
      const user = isAuthenticated(context);
      const post = await Post.findById(postId).populate("likes");
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.likes.find((like) => like.userhandle === user.userhandle)) {
        post.likes = post.likes.filter(
          (like) => like.userhandle !== user.userhandle
        );
      } else {
        post.likes.push(user.id);
      }
      await post.save();
      return post;
    },
    async createPost(parent, args, context, info) {
      const { content, title } = args;
      // check for valid user
      const user = isAuthenticated(context);
      if (isRCA(user) || isADMIN(user)) {
        //  TODO: create post
        const newPost = new Post({
          content: content,
          title: title,
          postedBy: user.id,
        });
        const savedpost = await newPost.save();
        return {
          ...savedpost._doc,
          id: savedpost._id,
          createdAt: savedpost.createdAt.toDateString(),
          updatedAt: savedpost.updatedAt.toDateString(),
        };
      } else {
        throw new AuthenticationError(
          "ACTION NOT ALLOWED/YOU ARE NOT AUTHORIZED"
        );
      }
    },
    async deletePost(parent, args, context, info) {
      const user = isAuthenticated(context);
      const { postId } = args;
      try {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
          throw new Error("Post Not found");
        }

        if (post.postedBy.toString() === user.id || isADMIN(user)) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError(
            "Action NOT ALLOWED/YOU ARE NOT AUTHORIZED"
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
