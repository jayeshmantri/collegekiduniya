const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    postedBy: String!
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
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userhandle: String, password: String!): User!
  }
`;

module.exports = typeDefs;
