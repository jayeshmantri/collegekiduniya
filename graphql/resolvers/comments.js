const { UserInputError } = require("apollo-server");
const { Comment } = require("../../models/commentSchema");
const { Post } = require("../../models/postSchema");
const { isAuthenticated, isADMIN } = require("../../utils/checkAuthenticity");
const { validateComment } = require("../../utils/validators");

module.exports = {
  Mutaion: {
    async createComment(parent, args, context, info) {
      const { postId, body } = args;
      const { errors, valid } = validateComment(body);
      const user = isAuthenticated(context);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      try {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
          throw new Error("Post not found");
        }
        const newComment = new Comment({ body: body, postedBy: user.id });
        await newComment.save();
        post.comments.push(newComment.id);
        await post.save();
        return newComment;
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteComment(parent, args, context, info) {
      const { commentId } = args;
      const user = isAuthenticated(context);
      try {
        const comment = await Comment.findOne({ _id: commentId }).populate(
          "postedBy"
        );
        if (!comment) {
          throw new Error("Comment not found");
        }
        if (comment.postedBy.userhandle === user.userhandle || isADMIN(user)) {
          await comment.delete();
          return "Comment deleted successfully";
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
