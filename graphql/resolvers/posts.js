const { Post } = require("../../models/postSchema");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({});
        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
};
