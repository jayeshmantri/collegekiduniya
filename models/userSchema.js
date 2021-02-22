const mongoose = require("mongoose");

// MANDATORY:fullname,email,password,userhandle

const userSchema = new mongoose.Schema(
  {
    userhandle: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      minlength: 10,
      maxlength: 30,
      trim: true,
      default: "User Bio is not updated",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    enc_password: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
    },
    cousrse: {
      type: String,
    },
    userrole: {
      type: String,
      enum: ["NCS", "RCS", "RCA", "ADMIN"], // NCS: NOT A COLLEGE STUDENT,RCS:REGISTERED COLLEGE STUDENT,RCA:REGISTERED COLLEGE AMBASADOR,ADMIN:ADMIN
      default: "NCS",
    },
    contact: {
      type: String,
      minlength: 10,
      maxlength: 13,
      unique: true,
    },
    favourite: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
      unique,
    },
    folowing: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: ["User"],
      },
    ],
    social_links: {
      type: String,
      unique: true,
    },
    projects: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Project",
      },
    ],
    college: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "College",
      unique: true,
    },
  },
  { timestamps: true }
);

// ? Virutuals for schema
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.enc_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// ? schema methods
userSchema.methods = {
  // check for valid password during signin
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.enc_password;
  },
  // encrypt the password so that it's not visible as plain text
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

exports.User = mongoose.model("User", userSchema);
