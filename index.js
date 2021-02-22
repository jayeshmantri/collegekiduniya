const { ApolloServer } = require("apollo-server");
const gqltag = require("graphql-tag");
const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

const { Post } = require("./models/postSchema");

const typeDefs = gqltag`
 type Post{
    id:ID!
    title:String!
    content:String!
    postedBy:String!
}
  type Query {
    getPosts:[Post]
  }
`;

const resolvers = {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGODB".red.bold, "--database connected--".bold.green);
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log("server is running on".green, `${res.url}`.blue);
  });
