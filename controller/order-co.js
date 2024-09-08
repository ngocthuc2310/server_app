const Order = require("../model/order-mo.js");
const User = require("../model/user-mo.js");
const nodeMailer = require("nodemailer");
const { strHTML } = require("../send_mail/file.js");
const adminEmail = "ngocthuc2310@gmail.com";
const adminPass = "bcss gwum vdwe anal";
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: adminEmail,
    pass: adminPass,
  },
});
let mailOptions = (to, subject, html) => {
  return {
    from: adminEmail,
    to,
    subject,
    html,
  };
};

exports.addOrder = (req, res) => {
  const info = req.body;
  exports.send = info;
  const order = new Order({
    date: Date.now(),
    products: info.products,
    user: info.user,
    address: info.address,
    total: info.total,
  });
  order
    .save()
    .then((x) => {
      const str = strHTML(info);
      transporter.sendMail(
        mailOptions(info.user.email, "Order successfully", str),
        (er, result) => {
          if (er) res.json({ msg: er.message });
          else res.json({ msg: "Order successfully" });
        }
      );
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.listOrder = (req, res) => {
  Order.find()
    .then((x) => {
      return res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.topMap = (req, res) => {
  let client = User.length,
    earningOfMonth = 0,
    order = 0;

  Order.find()
    .then((x) => {
      const z = x.filter(
        (t) => new Date(t.date).getMonth() == new Date().getMonth()
      );
      z.forEach((y) => {
        earningOfMonth += Number(y.total);
      });
      order = x.length;
      res.json({ client, earningOfMonth, order });
    })
    .catch((er) => res.json({ msg: er.message }));
};
