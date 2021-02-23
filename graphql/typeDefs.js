const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    postedBy: User!
    createdAt: String!
    updatedAt: String!
    likes: [Like]!
    comments: [Comment]!
  }
  type Like {
    id: ID!
    userhandle: String!
  }
  type Comment {
    id: ID!
    body: String!
    userhandle: String!
    replies: [Comment]!
  }
  type User {
    id: ID!
    fullname: String!
    email: String!
    token: String!
    about: String!
    userhandle: String!
    contact: String!
  }
  input RegisterInput {
    userhandle: String!
    fullname: String!
    email: String!
    password: String!
    confirmPassword: String!
    contact: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userhandle: String, password: String!): User!
    createPost(content: String!, title: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;
