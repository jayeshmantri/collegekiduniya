const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer .... i.e token format
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    } else {
      throw new Error("Authentication token must be 'Bearer [token]'");
    }
  } else {
    throw new Error("Authorization header must be provided");
  }
};

module.exports.isRCS = (user) => {
  console.log(user);
  return false;
};
