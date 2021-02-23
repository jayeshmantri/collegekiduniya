const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    postedBy: String!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: ID!
    fullname: String!
    email: String!
    token: String!
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
    deleatePost(postId: ID!): String!
  }
`;

module.exports = typeDefs;
