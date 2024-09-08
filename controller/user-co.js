const User = require("../model/user-mo.js");
const bcrypt = require("bcrypt");

exports.signUp = (req, res) => {
  const info = req.body;
  User.findOne({ email: info.email })
    .then((x) => {
      if (!x) {
        return bcrypt.hash(info.password, 12).then((result) => {
          const user = new User({
            email: info.email,
            password: result,
            fullname: info.fullname,
            phone: info.phone,
            role: "client",
          });
          return user.save();
        });
      } else {
        throw new Error("email is exist!");
      }
    })
    .then((x) => {
      res.json({ msg: "signup successfully" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.login = (req, res) => {
  const info = req.body;
  User.findOne({ email: info.email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(info.password, user.password).then((dm) => {
          if (dm) return res.json({ msg: "login successfully!", user: user });
          else throw new Error("Login faile!");
        });
      } else throw new Error("Login faile!");
    })
    .catch((er) => res.json({ msg: er.message, user: null }));
};
exports.auth = (req, res, next) => {
  const info = req.body;
  User.findOne({ _id: info.id })
    .then((user) => {
      if (user) next();
      else throw new Error({ msg: "not authenticated" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
