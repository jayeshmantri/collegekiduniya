const { Post } = require("../../models/postSchema");
const { isAuthenticated, isRCS } = require("../../utils/checkAuthenticity");
module.exports = {
  Query: {
    async getPost(parent, args, context, info) {
      const { postId } = args;
      try {
        const post = await Post.findById(postId);
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
        const posts = await Post.find({});
        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async createPost(parent, args, context, info) {
      const { content, title } = args;
      // check for valid user
      const user = isAuthenticated(context);
      const isvalid = isRCS(user);
      //TODO: create post
      // const newPost = new Post({
      //   content: content,
      //   title: title,
      //   postedBy: user.id,
      // });
      // const savedpost = await newPost.save();

      // return {
      //   ...savedpost._doc,
      //   id: savedpost._id,
      //   createdAt: savedpost.createdAt.toDateString(),
      //   updatedAt: savedpost.updatedAt.toDateString(),
      // };
    },
  },
};
